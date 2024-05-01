# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Errores y como resolverlos
### Error con husky al hacer commit
_Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension._

Para correr las pruebas unitarias es necesario quitar o comentar la linea "type": "module" del package.json sino va a marcar un error
con husky

### Error con firebase
Adicional jest no reconoce las varaibles de entorno de firebase por lo que es necesario setear las variables que vienen
en el .env en el src/firebase/config.js para que no marque algún error con la configuración de las credenciales




