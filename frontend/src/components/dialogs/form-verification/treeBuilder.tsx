import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse, Typography, Divider, IconButton } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const JsonTreeBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [editingNode, setEditingNode] = useState(null);
  const [editName, setEditName] = useState(''); // Para editar grupos
  const [editOptionName, setEditOptionName] = useState(''); // Para editar opciones
  const [open, setOpen] = useState(false);

  // Función para agregar un grupo (nodo principal)
  const addGroup = () => {
    const newGroup = { id: Date.now(), name: '', options: [] }; // Grupo tiene un campo "options"
    setNodes([...nodes, newGroup]); // Agregamos el nuevo grupo a la lista existente
    setEditingNode(newGroup.id); // Establecemos el nodo que estamos editando
  };

  // Función para agregar una opción dentro de un grupo
  const addOption = (groupId) => {
    const newOption = { id: Date.now(), name: '' }; // Nueva opción dentro del grupo
    const updateGroups = (items) =>
      items.map((item) =>
        item.id === groupId ? { ...item, options: [...item.options, newOption] } : item
      );
    setNodes(updateGroups(nodes)); // Actualizamos el grupo con la nueva opción
    setEditingNode(newOption.id); // Establecemos que estamos editando la nueva opción
  };

  // Función para guardar el nombre de un grupo u opción
  const saveName = (id, isOption = false) => {
    if (isOption) {
      if (editOptionName.trim() === '') return;
      const updateName = (items) =>
        items.map((item) => ({
          ...item,
          options: item.options.map((option) =>
            option.id === id ? { ...option, name: editOptionName } : option
          ),
        }));
      setNodes(updateName(nodes)); // Actualizamos el nombre de la opción
      setEditOptionName('');
    } else {
      if (editName.trim() === '') return;
      const updateName = (items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, name: editName }
            : { ...item, options: item.options.map((option) => (option.id === id ? { ...option, name: editName } : option)) }
        );
      setNodes(updateName(nodes)); // Actualizamos el nombre del grupo
      setEditName('');
    }
    setEditingNode(null);
  };

  // Función para eliminar un grupo u opción
  const deleteNode = (id) => {
    const removeNode = (items) => items.filter((item) => item.id !== id);
    setNodes(removeNode(nodes)); // Eliminamos el grupo u opción
  };

  // Función para manejar la apertura de los grupos
  const handleClick = () => {
    setOpen(!open);
  };

  // Función para renderizar los grupos y sus opciones
  const renderGroups = (items) => (
    <List component="nav" aria-label="json-tree">
      {items.map((item) => (
        <div key={item.id}>
          <ListItem disablePadding className='bg-blue-100'>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <i className="tabler-folder text-xl" />
              </ListItemIcon>
              <ListItemText primary={`Grupo nombre: ${item.name}` || 'Nuevo Grupo'} color='danger'/>
              <i className={open ? 'tabler-chevron-up text-xl' : 'tabler-chevron-down text-xl'} />
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {editingNode === item.id && item.name === '' ? (
                <>
                  <TextField value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nombre del grupo" fullWidth size="small" />
                  <Button onClick={() => saveName(item.id)} variant="contained" size="small">Guardar</Button>
                </>
              ) : (
                <>
                  <Button className='mt-2' variant="outlined" size="small" onClick={() => addOption(item.id)}>Agregar Opción</Button>
                  <IconButton size="small" onClick={() => deleteNode(item.id)}><Delete fontSize="small" /></IconButton>
                  <Divider className='mt-4 mb-4'/>
                </>
              )}

              {/* Renderizar las opciones dentro del grupo */}
              {item.options.length > 0 && (
                <div className="ml-4">
                <List component="div" disablePadding>
                  {item.options.map((option) => (
                    <ListItem key={option.id} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={option.name || 'Nueva Opción'} />
                        <IconButton size="small" onClick={() => deleteNode(option.id)}><Delete fontSize="small" /></IconButton>
                        {editingNode === option.id && option.name === '' ? (
                          <>
                            <TextField value={editOptionName} onChange={(e) => setEditOptionName(e.target.value)} placeholder="Nombre de la opción" fullWidth size="small" />
                            <Button onClick={() => saveName(option.id, true)} variant="contained" size="small">Guardar</Button>
                          </>
                        ) : null}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                </div>
              )}
            </List>
          </Collapse>
          <Divider />
        </div>
      ))}
    </List>
  );

  return (
    <div className="p-4">
      <Button variant="contained" startIcon={<Add />} onClick={addGroup}>Agregar Grupo</Button>
      {renderGroups(nodes)}

    </div>
  );
};

export default JsonTreeBuilder;
