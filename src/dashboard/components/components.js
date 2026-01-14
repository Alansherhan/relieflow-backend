import path from 'path';
import { fileURLToPath } from 'url';
import { ComponentLoader } from 'adminjs';
//import DonationRequestStatusFilteredSelect from './DonationRequestStatusFilteredSelect.jsx';
// import StatusFilteredSelect from './AidRequestStatusFilter.jsx';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add(
    'Dashboard',
    path.join(__dirname, 'Dashboard')
  ),

  LinkComponent: componentLoader.add(
    'LinkComponent',
    path.join(__dirname, 'LinkComponent')
  ),
  VolunteerFilteredSelect: componentLoader.add(
    'VolunteerFilteredSelect',
    path.join(__dirname, 'VolunteerFilteredSelect')
  ),
  StatusFilteredSelect: componentLoader.add(
    'StatusFilteredSelect',
    path.join(__dirname, 'AidRequestStatusFilteredSelect')
  ),
  DonationRequestStatusFilteredSelect: componentLoader.add(
    'DonationRequestStatusFilteredSelect',
    path.join(__dirname, 'DonationRequestStatusFilteredSelect')
  ),
  LoginComponent: componentLoader.add(
    'LoginComponent',
    path.join(__dirname, 'LoginComponent')
  ),
  ImageComponent: componentLoader.add(
    'ImageComponent',
    path.join(__dirname, 'ImageComponent')
  ),
  ImageListComponent: componentLoader.add(
    'ImageListComponent',
    path.join(__dirname, 'ImageListComponent')
  ),
  ImageEditComponent: componentLoader.add(
    'ImageEditComponent',
    path.join(__dirname, 'ImageEditComponent')
  ),
  ImageListEditComponent: componentLoader.add(
    'ImageListEditComponent',
    path.join(__dirname, 'ImageListEditComponent')
  ),
  CreateTaskFromAidRequest: componentLoader.add(
    'CreateTaskFromAidRequest',
    path.join(__dirname, 'CreateTaskFromAidRequest')
  ),
};

export { componentLoader, Components };
