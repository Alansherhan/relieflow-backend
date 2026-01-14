import { components } from 'react-select';
import adminUser from '../models/adminUser.js';
import AidRequest from '../models/AidRequest.js';
import CalamityType from '../models/CalamityType.js';
import Donation from '../models/Donation.js';
import DonationRequest from '../models/DonationRequest.js';
import ReliefCenter from '../models/ReliefCenter.js';
import Task from '../models/Task.js';
import userProfile from '../models/userProfile.js';
import { Components } from './components/components.js';
import { name } from '@adminjs/express';
import quiz from '../models/quiz.js';
import disasterTip from '../models/disasterTip.js';
import Notification from '../models/Notification.js';

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
      imageUrl: {
        isVisible: { list: true, filter: false, show: true, edit: true },
        components: {
          list: Components.ImageComponent,
          show: Components.ImageComponent,
          edit: Components.ImageEditComponent,
        },
      },
      location: {
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
          new: false,
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
    actions: {
      createTask: {
        actionType: 'record',
        component: Components.CreateTaskFromAidRequest,
        icon: 'Plus',
        label: 'Create Task',
        handler: async (request, response, context) => {
          // The actual task creation is handled by the React component
          // This handler just returns the record for the component to use
          return {
            record: context.record.toJSON(context.currentAdmin),
          };
        },
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
      amount: {
        isVisible: {
          list: false, // hide in list
          filter: true, // allow filtering
          show: true, // visible in details
          edit: true, // editable in form
        },
      },
      itemDetails: {
        isVisible: {
          list: false, // hide in list
          filter: true, // allow filtering
          show: true, // visible in details
          edit: true, // editable in form
        },
      },
    },
    translations: {
      en: {
        labels: {
          DonationSchema: 'Donations', // Resource name override
        },
      },
    },
  },
};

export const DonationRequestResource = {
  resource: DonationRequest,
  options: {
    properties: {
      _id: { isVisible: false },
      amount: {
        isVisible: {
          list: false, // hide in list
          filter: true, // allow filtering
          show: true, // visible in details
          edit: true, // editable in form
        },
      },
      proofImages: {
        isVisible: { list: true, filter: false, show: true, edit: true },
        components: {
          list: Components.ImageListComponent,
          show: Components.ImageListComponent,
          edit: Components.ImageListEditComponent,
        },
      },
      itemDetails: {
        isVisible: {
          list: false, // hide in list
          filter: true, // allow filtering
          show: true, // visible in details
          edit: true, // editable in form
        },
      },
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
      volunteersNeeded: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      assignedVolunteers: {
        reference: 'userProfile',
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      aidRequest: {
        reference: 'AidRequest', // Must match the resource ID you registered
        components: {
          edit: Components.StatusFilteredSelect,
        },
      },
      donationRequest: {
        reference: 'DonationRequest',
        components: {
          edit: Components.DonationRequestStatusFilteredSelect,
        },
      },
    },
    translations: {
      en: {
        labels: {
          TaskSchema: 'Task', // Resource name override
        },
        properties: {
          assignedVolunteers: 'Assigned Volunteers',
          volunteersNeeded: 'Volunteers Needed',
        },
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
      deletedAt: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      createdAt: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      updatedAt: {
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

export const QuizQuestionResource = {
  resource: quiz,
  options: {
    properties: {
      _id: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          QuizSchema: 'Quiz Questions', // Resource name override
        },
      },
    },
  },
};

export const DisasterTipsResource = {
  resource: disasterTip,
  options: {
    properties: {
      _id: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          DisasterTipSchema: 'Disaster Tips', // Resource name override
        },
      },
    },
  },
};

export const NotificationResource = {
  resource: Notification,
  options: {
    properties: {
      _id: { isVisible: false },
      recipientId: {
        reference: 'userProfile',
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      readBy: {
        reference: 'userProfile',
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      isReadByAll: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
    translations: {
      en: {
        labels: {
          Notification: 'Notifications',
        },
        properties: {
          readBy: 'Read By (Users)',
          isReadByAll: 'Read By All',
          recipientId: 'Recipient',
        },
      },
    },
  },
};
