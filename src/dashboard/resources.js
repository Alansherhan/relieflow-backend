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
import PortalDonation from '../models/PortalDonation.js';
import AdminWallet from '../models/AdminWallet.js';
import { sendToUser, sendToRole } from '../services/fcmService.js';

export const AdminResource = {
  resource: adminUser,
  options: {
    properties: {
      password: { isVisible: false },
      _id: { isVisible: false },
    },
    // or you can provide an object with your custom resource options
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const AidRequestResource = {
  resource: AidRequest,
  options: {
    properties: {
      _id: {
        isVisible: false,
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
          show: false,
          edit: false,
          new: false,
        },
        components: {
          list: Components.LinkComponent,
        },
      },
      formattedAddress: {
        isVisible: { list: true, filter: false, show: false, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          show: Components.AddressShow,
          edit: Components.MapPicker,
        },
      },
      // Hide nested address fields from default rendering
      'address.addressLine1': { isVisible: false },
      'address.addressLine2': { isVisible: false },
      'address.addressLine3': { isVisible: false },
      'address.pinCode': { isVisible: false },
      'address.location': { isVisible: false },
      'address.location.type': { isVisible: false },
      'address.location.coordinates': { isVisible: false },
      // Hide top-level location nested fields to prevent validation errors
      'location.type': { isVisible: false },
      'location.coordinates': { isVisible: false },
    },
    actions: {
      // Clean up corrupted location.coordinates before showing/editing
      show: {
        before: async (request, context) => {
          // Remove location.coordinates if it's null to prevent validation errors
          if (request.payload && request.payload['location.coordinates'] === null) {
            delete request.payload['location.coordinates'];
          }
          return request;
        },
        after: async (response, request, context) => {
          console.log('[DEBUG HOOK] show.after - errors before cleanup:', JSON.stringify(response.record?.errors || {}));
          // Clean up the record params if location.coordinates is null
          if (response.record?.params?.['location.coordinates'] === null) {
            delete response.record.params['location.coordinates'];
          }
          // Clear the coordinates.0 error as it's from top-level location, not relevant
          if (response.record?.errors?.['coordinates.0']) {
            delete response.record.errors['coordinates.0'];
            console.log('[DEBUG HOOK] Deleted coordinates.0 error');
          }
          console.log('[DEBUG HOOK] show.after - errors after cleanup:', JSON.stringify(response.record?.errors || {}));
          return response;
        },
      },
      edit: {
        handler: async (request, response, context) => {
          const { resource, record, currentAdmin } = context;
          
          if (request.method === 'get') {
            // Just return the record for display
            return { record: record.toJSON(currentAdmin) };
          }
          
          // POST - handle save
          const payload = request.payload || {};
          console.log('[DEBUG HANDLER] edit handler - payload keys:', Object.keys(payload));
          
          // Build the update object manually
          const updateData = {};
          
          // Handle simple fields
          if (payload.calamityType) updateData.calamityType = payload.calamityType;
          if (payload.imageUrl !== undefined) updateData.imageUrl = payload.imageUrl;
          if (payload.description !== undefined) updateData.description = payload.description;
          if (payload.status) updateData.status = payload.status;
          if (payload.priority) updateData.priority = payload.priority;
          
          // Handle address fields - reconstruct from flat keys
          const address = {};
          if (payload['address.addressLine1'] !== undefined) address.addressLine1 = payload['address.addressLine1'];
          if (payload['address.addressLine2'] !== undefined) address.addressLine2 = payload['address.addressLine2'];
          if (payload['address.addressLine3'] !== undefined) address.addressLine3 = payload['address.addressLine3'];
          if (payload['address.pinCode'] !== undefined) address.pinCode = payload['address.pinCode'];
          
          // Handle address.location if present
          if (payload['address.location.coordinates.0'] !== undefined && 
              payload['address.location.coordinates.1'] !== undefined) {
            const lng = parseFloat(payload['address.location.coordinates.0']);
            const lat = parseFloat(payload['address.location.coordinates.1']);
            if (!isNaN(lng) && !isNaN(lat)) {
              address.location = {
                type: 'Point',
                coordinates: [lng, lat]
              };
            }
          }
          
          if (Object.keys(address).length > 0) {
            updateData.address = address;
          }
          
          // Handle top-level location field
          const coord0 = payload['location.coordinates.0'];
          const coord1 = payload['location.coordinates.1'];
          if (coord0 !== undefined && coord1 !== undefined) {
            const lng = parseFloat(coord0);
            const lat = parseFloat(coord1);
            if (!isNaN(lng) && !isNaN(lat)) {
              updateData.location = {
                type: payload['location.type'] || 'Point',
                coordinates: [lng, lat]
              };
            }
          }
          
          console.log('[DEBUG HANDLER] Update data:', JSON.stringify(updateData, null, 2));
          
          try {
            // Use Mongoose directly to update
            const Model = resource._decorated?.mongoose?.model || resource.MongooseModel || AidRequest;
            await Model.findByIdAndUpdate(record.id(), { $set: updateData });
            
            // Reload the record
            const updatedRecord = await resource.findOne(record.id());
            
            return {
              record: updatedRecord.toJSON(currentAdmin),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message: 'Record updated successfully',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[DEBUG HANDLER] Save error:', error);
            return {
              record: record.toJSON(currentAdmin),
              notice: {
                message: `Error saving: ${error.message}`,
                type: 'error',
              },
            };
          }
        },
      },
      createTask: {
        actionType: 'record',
        component: Components.CreateTaskFromAidRequest,
        icon: 'Plus',
        label: 'Create Task',
        handler: async (request, response, context) => {
          return {
            record: context.record.toJSON(context.currentAdmin),
          };
        },
      },
    },
    translations: {
      en: {
        labels: {
          AidRequest: 'Aid Request',
        },
        properties: {
          address: 'Location & Address',
          formattedAddress: 'Address',
          'address.addressLine1': 'Street Address',
          'address.addressLine2': 'Area / Locality',
          'address.addressLine3': 'Landmark',
          'address.pinCode': 'PIN Code',
          'address.location': 'GPS Location',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const CalamityTypeResource = {
  resource: CalamityType,
  options: {
    properties: {
      _id: { isVisible: false },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
          list: false,
          filter: true,
          show: true,
          edit: true,
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
          list: false,
          filter: true,
          show: true,
          edit: true,
        },
      },
      location: {
        isVisible: { list: false, filter: false, show: false, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          show: Components.AddressShow,
          edit: Components.MapPicker,
        },
      },
      // Hide nested address fields
      'address.addressLine1': { isVisible: false },
      'address.addressLine2': { isVisible: false },
      'address.addressLine3': { isVisible: false },
      'address.pinCode': { isVisible: false },
      'address.location': { isVisible: false },
      'address.location.type': { isVisible: false },
      'address.location.coordinates': { isVisible: false },
      // Hide top-level location nested fields
      'location.type': { isVisible: false },
      'location.coordinates': { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          DonationRequest: 'Donation Requests',
        },
        properties: {
          address: 'Pickup / Delivery Location',
          'address.addressLine1': 'Street Address',
          'address.addressLine2': 'Area / Locality',
          'address.addressLine3': 'Landmark',
          'address.pinCode': 'PIN Code',
          'itemDetails.unit': 'Unit',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const ReliefCenterResource = {
  resource: ReliefCenter,
  options: {
    properties: {
      _id: { isVisible: false },
      formattedAddress: {
        isVisible: { list: true, filter: false, show: false, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          show: Components.AddressShow,
          edit: Components.MapPicker,
        },
      },
      // Hide nested address fields
      'address.addressLine1': { isVisible: false },
      'address.addressLine2': { isVisible: false },
      'address.addressLine3': { isVisible: false },
      'address.pinCode': { isVisible: false },
      'address.location': { isVisible: false },
      'address.location.type': { isVisible: false },
      'address.location.coordinates': { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          ReliefCenter: 'Relief Centers',
        },
        properties: {
          formattedAddress: 'Address',
          address: 'Shelter Location',
          coordinatorName: 'Coordinator Name',
          coordinatorNumber: 'Coordinator Phone',
          shelterName: 'Shelter Name',
          'address.addressLine1': 'Street Address',
          'address.addressLine2': 'Area / Locality',
          'address.addressLine3': 'Landmark',
          'address.pinCode': 'PIN Code',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
        isVisible: { list: true, filter: false, show: false, edit: false },
      },
      address: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          show: Components.AddressShow,
          edit: Components.MapPicker,
        },
      },
      // Hide nested address fields
      'address.addressLine1': { isVisible: false },
      'address.addressLine2': { isVisible: false },
      'address.addressLine3': { isVisible: false },
      'address.pinCode': { isVisible: false },
      'address.location': { isVisible: false },
      'address.location.type': { isVisible: false },
      'address.location.coordinates': { isVisible: false },
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
          userProfile: 'Users',
        },
        properties: {
          formattedAddress: 'Address',
          address: 'Home Address',
          'address.addressLine1': 'Street Address',
          'address.addressLine2': 'Area / Locality',
          'address.addressLine3': 'Landmark',
          'address.pinCode': 'PIN Code',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
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
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const NotificationResource = {
  resource: Notification,
  options: {
    properties: {
      _id: { isVisible: false },

      // 1. Title
      title: {
        isVisible: { list: true, filter: true, show: true, edit: false },
        position: 1,
      },

      // 2. Message body
      body: {
        type: 'textarea',
        isVisible: { list: false, filter: false, show: true, edit: false },
        position: 2,
      },

      // 3. Notification type
      type: {
        isVisible: { list: true, filter: true, show: true, edit: false },
        position: 3,
        availableValues: [
          { value: 'admin_broadcast', label: '📢 Announcement' },
          { value: 'weather_alert', label: '⛈️ Weather Alert' },
          { value: 'disaster_alert', label: '🚨 Disaster Alert' },
          { value: 'relief_center_update', label: '📍 Relief Center Update' },
          { value: 'system_notification', label: '🔧 System Notice' },
        ],
      },

      // 4. Target audience (for broadcasts)
      targetUserType: {
        isVisible: { list: true, filter: true, show: true, edit: false },
        position: 4,
        availableValues: [
          { value: 'all', label: '👥 Everyone' },
          { value: 'public', label: '🏠 Public Users' },
          { value: 'volunteer', label: '🙋 Volunteers' },
        ],
      },

      // 5. Specific recipient
      recipientId: {
        reference: 'userProfile',
        isVisible: { list: true, filter: true, show: true, edit: false },
        position: 5,
      },

      // Hide system/internal fields
      readBy: { isVisible: false },
      isReadByAll: { isVisible: false },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: { isVisible: false },
    },
    actions: {
      // Use custom form for creating notifications
      new: {
        component: Components.NotificationForm,
        after: async (response) => {
          // Send FCM push notification after creating
          if (response.record && !response.record.errors) {
            const notification = response.record.params;
            const pushData = {
              title: notification.title,
              body: notification.body,
              data: {
                type: notification.type,
                notificationId: notification._id,
              },
            };

            try {
              if (notification.recipientId) {
                // Targeted notification
                await sendToUser(notification.recipientId, pushData);
                console.log(`FCM sent to user ${notification.recipientId}`);
              } else {
                // Broadcast notification
                await sendToRole(notification.targetUserType || 'all', pushData);
                console.log(`FCM broadcast to ${notification.targetUserType || 'all'}`);
              }
            } catch (error) {
              console.error('FCM send error:', error.message);
            }
          }
          return response;
        },
      },
      // Use custom form for editing notifications
      edit: {
        component: Components.NotificationForm,
      },
    },
    translations: {
      en: {
        labels: {
          Notification: 'Notifications',
        },
        properties: {
          title: 'Title',
          body: 'Message',
          type: 'Type',
          targetUserType: 'Audience',
          recipientId: 'Recipient',
          createdAt: 'Sent At',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const PortalDonationResource = {
  resource: PortalDonation,
  options: {
    properties: {
      _id: { isVisible: false },
      donor: {
        reference: 'userProfile',
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      donationRequest: {
        reference: 'DonationRequest',
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      pickupTask: {
        reference: 'TaskSchema',
        isVisible: { list: false, filter: true, show: true, edit: false },
      },
      proofImage: {
        isVisible: { list: true, filter: false, show: true, edit: true },
        components: {
          list: Components.ImageComponent,
          show: Components.ImageComponent,
        },
      },
      // Pickup address with custom components
      pickupAddress: {
        isVisible: { list: false, filter: false, show: true, edit: true },
        components: {
          show: Components.AddressShow,
          edit: Components.MapPicker,
        },
      },
      pickupLocation: {
        isVisible: { list: false, filter: false, show: false, edit: false },
      },
      // Hide nested pickup address fields
      'pickupAddress.addressLine1': { isVisible: false },
      'pickupAddress.addressLine2': { isVisible: false },
      'pickupAddress.addressLine3': { isVisible: false },
      'pickupAddress.pinCode': { isVisible: false },
      'pickupAddress.location': { isVisible: false },
      'pickupAddress.location.type': { isVisible: false },
      'pickupAddress.location.coordinates': { isVisible: false },
    },
    actions: {
      // Admin can approve submitted donations
      approve: {
        actionType: 'record',
        icon: 'Check',
        label: 'Approve',
        guard: 'Are you sure you want to approve this donation?',
        isVisible: (context) => context.record?.params?.status === 'submitted',
        handler: async (request, response, context) => {
          const { record, resource } = context;
          await resource.update(record.id(), { status: 'completed' });
          return {
            record: (await resource.findOne(record.id())).toJSON(context.currentAdmin),
            notice: {
              message: 'Donation approved successfully!',
              type: 'success',
            },
          };
        },
      },
    },
    translations: {
      en: {
        labels: {
          PortalDonation: 'Portal Donations',
        },
        properties: {
          donorName: 'Donor Name',
          donorEmail: 'Donor Email',
          donorPhone: 'Donor Phone',
          donationType: 'Type',
          deliveryMethod: 'Delivery Method',
          isWalletDonation: 'Wallet Donation',
          pickupAddress: 'Pickup Location',
          pickupDate: 'Pickup Date',
          pickupNotes: 'Pickup Instructions',
          'pickupAddress.addressLine1': 'Street Address',
          'pickupAddress.addressLine2': 'Area / Locality',
          'pickupAddress.addressLine3': 'Landmark',
          'pickupAddress.pinCode': 'PIN Code',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

export const AdminWalletResource = {
  resource: AdminWallet,
  options: {
    properties: {
      _id: { isVisible: false },
      transactions: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
    actions: {
      // Only allow viewing, not creating/deleting
      new: { isAccessible: false },
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
    },
    translations: {
      en: {
        labels: {
          AdminWallet: 'Relief Fund Wallet',
        },
        properties: {
          balance: 'Current Balance',
          totalCredits: 'Total Donations Received',
          totalDebits: 'Total Funds Used',
          donorCount: 'Number of Donors',
        },
      },
    },
  },
};
