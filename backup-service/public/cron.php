<?php

require __DIR__ . '/vendor/autoload.php';

function obtenerIdCarpetaBackup($service) {
    $folderName = 'backup';

    $query = sprintf("name = '%s' and mimeType = 'application/vnd.google-apps.folder' and trashed = false", $folderName);
    $results = $service->files->listFiles([
        'q' => $query,
        'fields' => 'files(id, name)',
        'spaces' => 'drive',
    ]);

    if (count($results->getFiles()) > 0) {
        return $results->getFiles()[0]->getId();
    } else {
        $fileMetadata = new Google_Service_Drive_DriveFile([
            'name' => $folderName,
            'mimeType' => 'application/vnd.google-apps.folder'
        ]);

        $folder = $service->files->create($fileMetadata, [
            'fields' => 'id'
        ]);

        return $folder->getId();
    }
}

function subirAGoogleDrive($pathArchivo, $nombreEnDrive) {
    $client = new Google_Client();
    $client->setAuthConfig('/var/www/html/secret_client.json');
    $client->addScope(Google_Service_Drive::DRIVE_FILE);
    $client->setAccessType('offline');

    $tokenPath = '/var/www/html/token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    } else {
        throw new Exception('Token no encontrado. Ejecuta auth.php primero.');
    }

    if ($client->isAccessTokenExpired()) {
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($tokenPath, json_encode($client->getAccessToken()));
        } else {
            throw new Exception('No se puede refrescar el token. Ejecuta auth.php nuevamente.');
        }
    }

    $service = new Google_Service_Drive($client);
    $folderId = obtenerIdCarpetaBackup($service);

    $fileMetadata = new Google_Service_Drive_DriveFile([
        'name' => $nombreEnDrive,
        'parents' => [$folderId]
    ]);

    $content = file_get_contents($pathArchivo);

    $file = $service->files->create($fileMetadata, [
        'data' => $content,
        'mimeType' => 'application/sql',
        'uploadType' => 'multipart',
        'fields' => 'id'
    ]);

    echo "Archivo subido a Google Drive (backup), ID: " . $file->id . "<br>";
}

// Leer el archivo databases.json
$jsonPath = __DIR__ . '/databases.json';
if (!file_exists($jsonPath)) {
    die("El archivo databases.json no existe.");
}

$databases = json_decode(file_get_contents($jsonPath), true);
if (!is_array($databases)) {
    die("El contenido de databases.json no es válido.");
}

// Recorrer las bases de datos y hacer backup
foreach ($databases as $db) {
    if (!isset($db['dbname'])) {
        echo "Registro inválido en databases.json<br>";
        continue;
    }

    $dbname = $db['dbname'];
    $backupFile = "uploads/backup_{$dbname}_" . date("Ymd_His") . ".sql";
    $fullPath = "/var/www/html/$backupFile";

    $cmd = sprintf(
        'mysqldump -h%s -u%s -p%s %s > %s',
        escapeshellarg('db'),
        escapeshellarg('root'),
        escapeshellarg('widowmaker'),
        escapeshellarg($dbname),
        escapeshellarg($fullPath)
    );

    echo "Ejecutando comando: $cmd<br>";

    system($cmd, $retval);
    
    echo "retval: $retval<br>";
    
    if ($retval !== 0) {
        echo "Error creando backup de $dbname<br>";
        continue;
    }
    echo $retval === 0 ? "Backup creado: $backupFile<br>" : "Error creando backup de $dbname<br>";

    if ($retval === 0) {
        subirAGoogleDrive($fullPath, basename($backupFile));
    }
    echo "<br>";
}

?>
