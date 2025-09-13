import path from 'path';
import { fileURLToPath } from 'url';
import { ComponentLoader } from 'adminjs';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader()

const Components = {
    LinkComponent: componentLoader.add('LinkComponent', path.join(__dirname,'LinkComponent')),
    // other custom components
}

export { componentLoader, Components }