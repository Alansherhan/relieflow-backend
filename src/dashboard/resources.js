import adminUser from '../models/adminUser.js';
import AidRequest from '../models/AidRequest.js';
import CalamityType from '../models/CalamityType.js';
import Donation from '../models/Donation.js';
import DonationRequest from '../models/DonationRequest.js';
import ReliefCenter from '../models/ReliefCenter.js';
import Task from '../models/Task.js';
import userProfile from '../models/userProfile.js';
import { Components } from './components/components.js';

export const AdminResource = {
  resource: adminUser,
  options: {
    properties: {
      password: { isVisible: false },
      _id: { isVisible: false },
    },
    // or you can provide an object with your custom resource options
  },
};

export const AidRequestResource = {
  resource: AidRequest,
  options: {
    properties: {
      _id: {
        isVisible: false, // This hides the 'id' property everywhere
      },
      location: {
        isVisible:{
          new: false,
          edit: false
        },
        components: {
          list: Components.LinkComponent,
        },
      },
      formattedAddress: {
        isVisible: { list: true, filter: false, show: true, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      
    },
    translations: {
      en: {
        labels: {
          AidRequest: 'Aid Request', // Resource name override
        },
        properties: {
          formattedAddress: 'Address', // Global label for property across all resources
          address: 'Raw Address',
        },
      },
    },
  },
};

export const CalamityTypeResource = {
  resource: CalamityType,
  options: {
    properties: {
      _id: { isVisible: false },
    },
  },
};

export const DonationResource = {
  resource: Donation,
  options: {
    properties: {
      _id: { isVisible: false },
    },
  },
};

export const DonationRequestResource = {
  resource: DonationRequest,
  options: {
    properties: {
      _id: { isVisible: false },
    },
  },
};

export const ReliefCenterResource = {
  resource: ReliefCenter,
  options: {
    properties: {
      _id: { isVisible: false },
      formattedAddress: {
        isVisible: { list: true, filter: false, show: true, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
    },
    translations: {
      en: {
        labels: {
          ReliefCenter: 'Relief Centers', // Resource name override
        },
        properties: {
          formattedAddress: 'Address', // Global label for property across all resources
          address: 'Raw Address',
        },
      },
    },
  },
};

export const TaskResource = {
  resource: Task,
  options: {
    properties: {
      _id: { isVisible: false },
      assignedTo:{
        components:{
          edit: Components.VolunteerFilteredSelect
        }
      }
    },
    translations: {
      en: {
        labels: {
          Task: 'Task', // Resource name override
        },
        // properties: {
        //   formattedAddress: 'Address', // Global label for property across all resources
        //   address: 'Raw Address',
        // },
      },
    },
  },
};

export const UserProfileResource = {
  resource: userProfile,
  options: {
    properties: {
      _id: { isVisible: false },
      password: { isVisible: false },
      formattedAddress: {
        isVisible: { list: true, filter: false, show: true, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
    },
    translations: {
      en: {
        labels: {
          userProfile: 'Users', // Resource name override
        },
        properties: {
          formattedAddress: 'Address', // Global label for property across all resources
          address: 'Raw Address',
        },
      },
    },
  },
};
