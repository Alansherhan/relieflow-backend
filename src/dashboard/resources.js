import { components } from 'react-select';
import adminUser from '../models/adminUser.js';
import AidRequest from '../models/AidRequest.js';
import CalamityType from '../models/CalamityType.js';
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
import { Timestamp } from 'mongodb';
import { resetPassword } from '../controllers/userProfileController.js';
import { ps } from 'zod/v4/locales';

// FCM is now sent automatically via Notification model post-save hook

export const AdminResource = {
  resource: adminUser,
  options: {
    navigation: {
      name: 'User Management',
      icon: 'User',
    },
    properties: {
      password: { isVisible: false },
      _id: { isVisible: false },
      passwordResetOtp: { isVisible: false },
      passwordResetOtpExpires: { isVisible: false },
      PsswordResetOtpExpires: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          Admin: 'Admin Staff',
        },
        properties:{
          PasswordResetOtpExpires: { isVisible: false },
        }
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

const parseAidRequestPayload = (payload) => {
  const updateData = {};

  if (payload.calamityType) updateData.calamityType = payload.calamityType;
  if (payload.imageUrl !== undefined) updateData.imageUrl = payload.imageUrl;
  if (payload.description !== undefined)
    updateData.description = payload.description;
  if (payload.status) updateData.status = payload.status;
  if (payload.priority) updateData.priority = payload.priority;
  if (payload.aidRequestedBy)
    updateData.aidRequestedBy = payload.aidRequestedBy;

  const address = {};
  if (payload['address.addressLine1'] !== undefined)
    address.addressLine1 = payload['address.addressLine1'];
  if (payload['address.addressLine2'] !== undefined)
    address.addressLine2 = payload['address.addressLine2'];
  if (payload['address.addressLine3'] !== undefined)
    address.addressLine3 = payload['address.addressLine3'];
  if (payload['address.pinCode'] !== undefined)
    address.pinCode = payload['address.pinCode'];

  if (
    payload['address.location.coordinates.0'] !== undefined &&
    payload['address.location.coordinates.1'] !== undefined
  ) {
    const lng = parseFloat(payload['address.location.coordinates.0']);
    const lat = parseFloat(payload['address.location.coordinates.1']);
    if (!isNaN(lng) && !isNaN(lat)) {
      address.location = {
        type: 'Point',
        coordinates: [lng, lat],
      };
    }
  }

  if (Object.keys(address).length > 0) {
    updateData.address = address;
  }

  const coord0 = payload['location.coordinates.0'];
  const coord1 = payload['location.coordinates.1'];
  if (coord0 !== undefined && coord1 !== undefined) {
    const lng = parseFloat(coord0);
    const lat = parseFloat(coord1);
    if (!isNaN(lng) && !isNaN(lat)) {
      updateData.location = {
        type: payload['location.type'] || 'Point',
        coordinates: [lng, lat],
      };
    }
  }
  return updateData;
};

const parseReliefCenterPayload = (payload) => {
  const updateData = {};

  if (payload.shelterName !== undefined)
    updateData.shelterName = payload.shelterName;
  if (payload.coordinatorName !== undefined)
    updateData.coordinatorName = payload.coordinatorName;
  if (payload.coordinatorNumber !== undefined)
    updateData.coordinatorNumber = payload.coordinatorNumber;

  const address = {};
  if (payload['address.addressLine1'] !== undefined)
    address.addressLine1 = payload['address.addressLine1'];
  if (payload['address.addressLine2'] !== undefined)
    address.addressLine2 = payload['address.addressLine2'];
  if (payload['address.addressLine3'] !== undefined)
    address.addressLine3 = payload['address.addressLine3'];
  if (payload['address.pinCode'] !== undefined)
    address.pinCode = payload['address.pinCode'];

  if (
    payload['address.location.coordinates.0'] !== undefined &&
    payload['address.location.coordinates.1'] !== undefined
  ) {
    const lng = parseFloat(payload['address.location.coordinates.0']);
    const lat = parseFloat(payload['address.location.coordinates.1']);
    if (!isNaN(lng) && !isNaN(lat)) {
      address.location = {
        type: 'Point',
        coordinates: [lng, lat],
      };
    }
  }

  if (Object.keys(address).length > 0) {
    updateData.address = address;
  }

  return updateData;
};

export const AidRequestResource = {
  resource: AidRequest,
  options: {
    titleProperty: 'name',
    navigation: {
      name: 'Aid Operations',
      icon: 'Compass',
    },
    properties: {
      _id: {
        isVisible: false,
      },
      name: {
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
          if (
            request.payload &&
            request.payload['location.coordinates'] === null
          ) {
            delete request.payload['location.coordinates'];
          }
          return request;
        },
        after: async (response, request, context) => {
          console.log(
            '[DEBUG HOOK] show.after - errors before cleanup:',
            JSON.stringify(response.record?.errors || {})
          );
          // Clean up the record params if location.coordinates is null
          if (response.record?.params?.['location.coordinates'] === null) {
            delete response.record.params['location.coordinates'];
          }
          // Clear the coordinates.0 error as it's from top-level location, not relevant
          if (response.record?.errors?.['coordinates.0']) {
            delete response.record.errors['coordinates.0'];
            console.log('[DEBUG HOOK] Deleted coordinates.0 error');
          }
          console.log(
            '[DEBUG HOOK] show.after - errors after cleanup:',
            JSON.stringify(response.record?.errors || {})
          );

          // Mark request as read when admin views it
          try {
            const recordId = response.record?.id || context.record?.id();
            if (recordId) {
              await AidRequest.findByIdAndUpdate(recordId, { isRead: true });
              console.log(`[AdminJS] Marked AidRequest ${recordId} as read`);
            }
          } catch (err) {
            console.error('[AdminJS] Error marking AidRequest as read:', err);
          }

          return response;
        },
      },
      new: {
        handler: async (request, response, context) => {
          const { resource, currentAdmin } = context;

          if (request.method === 'get') {
            return { record: {} };
          }

          const payload = request.payload || {};
          console.log(
            '[DEBUG HANDLER] new handler - payload keys:',
            Object.keys(payload)
          );

          const updateData = parseAidRequestPayload(payload);
          if (!updateData.status) updateData.status = 'pending';

          console.log(
            '[DEBUG HANDLER] Create data:',
            JSON.stringify(updateData, null, 2)
          );

          try {
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              AidRequest;
            const newRecord = await Model.create(updateData);

            return {
              record: newRecord.toJSON(currentAdmin),
              redirectUrl: context.h.resourceUrl({
                resourceId: resource.id(),
              }),
              notice: {
                message: 'Aid Request created successfully',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[DEBUG HANDLER] Create error:', error);
            return {
              record: {
                params: payload,
                errors: { payload: { message: error.message } },
              },
              notice: {
                message: `Error creating: ${error.message}`,
                type: 'error',
              },
            };
          }
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
          console.log(
            '[DEBUG HANDLER] edit handler - payload keys:',
            Object.keys(payload)
          );

          const updateData = parseAidRequestPayload(payload);

          console.log(
            '[DEBUG HANDLER] Update data:',
            JSON.stringify(updateData, null, 2)
          );

          try {
            // Use Mongoose directly to update
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              AidRequest;

            // Check if status is changing
            const oldStatus = record.params?.status;
            const newStatus = updateData.status;
            const statusChanged = newStatus && oldStatus !== newStatus;

            await Model.findByIdAndUpdate(record.id(), { $set: updateData });

            // Send notification if status changed
            // NOTE: FCM is now sent automatically via Notification model post-save hook
            if (statusChanged) {
              const requesterId = record.params?.aidRequestedBy;
              if (requesterId) {
                try {
                  let notificationTitle, notificationBody, notificationType;

                  // Fech calamity type name for more descriptive notifications
                  let calamityName = 'aid';
                  try {
                    const calamityTypeId = record.params?.calamityType;
                    if (calamityTypeId) {
                      const calamityType =
                        await CalamityType.findById(calamityTypeId);
                      if (calamityType) {
                        calamityName = calamityType.calamityName;
                      }
                    }
                  } catch (err) {
                    console.error(
                      '[AdminJS] Error fetching calamity type:',
                      err
                    );
                  }

                  if (newStatus === 'rejected') {
                    notificationTitle = 'Aid Request Update';
                    notificationBody =
                      'Unfortunately, your aid request could not be processed at this time.';
                    notificationType = 'aid_request_rejected';
                  } else if (newStatus === 'completed') {
                    notificationTitle = 'Aid Request Completed';
                    notificationBody = `Your ${calamityName} request has been completed.`;
                    notificationType = 'aid_request_completed';
                  } else if (newStatus === 'accepted') {
                    notificationTitle = 'Aid Request Accepted';
                    notificationBody =
                      'Your aid request has been accepted and is being processed.';
                    notificationType = 'aid_request_accepted';
                  }

                  if (notificationTitle) {
                    await Notification.create({
                      title: notificationTitle,
                      body: notificationBody,
                      recipientId: requesterId,
                      type: notificationType,
                      data: { aidRequestId: record.id() },
                    });
                    console.log(
                      `[AdminJS] Created ${notificationType} notification for user ${requesterId}`
                    );
                  }
                } catch (notifError) {
                  console.error(
                    '[AdminJS] Error creating status notification:',
                    notifError
                  );
                }
              }
            }

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
        isAccessible: ({ record }) => record?.params?.status === 'accepted',
        handler: async (request, response, context) => {
          return {
            record: context.record.toJSON(context.currentAdmin),
          };
        },
      },
      // Quick Accept action - visible only for pending requests
      accept: {
        actionType: 'record',
        component: false,
        icon: 'Check',
        label: 'Accept',
        guard: 'Are you sure you want to accept this aid request?',
        isVisible: (context) => context.record?.params?.status === 'pending',
        showInDrawer: false,
        handler: async (request, response, context) => {
          const { record, resource } = context;

          try {
            // Update status to accepted
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              AidRequest;
            await Model.findByIdAndUpdate(record.id(), {
              $set: { status: 'accepted' },
            });

            const requesterId = record.params?.aidRequestedBy;
            const calamityName =
              record.params?.['calamity.calamityName'] || 'Aid';
            const location =
              record.params?.['address.addressLine1'] || 'your location';

            // Notify the requester
            if (requesterId) {
              await Notification.create({
                title: 'Aid Request Accepted',
                body: `Your ${calamityName} aid request for ${location} has been accepted.`,
                recipientId: requesterId,
                type: 'aid_request_accepted',
                data: { aidRequestId: record.id() },
              });
              console.log(
                `[AdminJS] Created aid_request_accepted notification for user ${requesterId}`
              );
            }

            // NOTE: Volunteer notifications are handled when admin creates a Task
            // (via Task model post-save hook), NOT when accepting the request
            console.log(
              `[AdminJS] Aid request accepted. Volunteer notification deferred until task creation.`
            );

            return {
              record: (await resource.findOne(record.id())).toJSON(
                context.currentAdmin
              ),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message:
                  'Aid request accepted successfully!',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[AdminJS] Accept action error:', error);
            return {
              record: record.toJSON(context.currentAdmin),
              notice: {
                message: `Error accepting request: ${error.message}`,
                type: 'error',
              },
            };
          }
        },
      },
      // Quick Reject action - visible only for pending requests
      reject: {
        actionType: 'record',
        component: false,
        icon: 'X',
        label: 'Reject',
        guard: 'Are you sure you want to reject this aid request?',
        isVisible: (context) => context.record?.params?.status === 'pending',
        showInDrawer: false,
        handler: async (request, response, context) => {
          const { record, resource } = context;

          try {
            // Update status to rejected
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              AidRequest;
            await Model.findByIdAndUpdate(record.id(), {
              $set: { status: 'rejected' },
            });

            const requesterId = record.params?.aidRequestedBy;
            const calamityName =
              record.params?.['calamity.calamityName'] || 'Aid';
            const location =
              record.params?.['address.addressLine1'] || 'your location';

            // Notify the requester
            if (requesterId) {
              await Notification.create({
                title: 'Aid Request Update',
                body: `Your ${calamityName} aid request for ${location} could not be processed at this time.`,
                recipientId: requesterId,
                type: 'aid_request_rejected',
                data: { aidRequestId: record.id() },
              });
              console.log(
                `[AdminJS] Created aid_request_rejected notification for user ${requesterId}`
              );
            }

            return {
              record: (await resource.findOne(record.id())).toJSON(
                context.currentAdmin
              ),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message: 'Aid request rejected.',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[AdminJS] Reject action error:', error);
            return {
              record: record.toJSON(context.currentAdmin),
              notice: {
                message: `Error rejecting request: ${error.message}`,
                type: 'error',
              },
            };
          }
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
    navigation: {
      name: 'System Configuration',
      icon: 'Settings',
    },
    properties: {
      _id: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          CalamityType: 'Calamity Types',
        },
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
};

// export const DonationResource = {
//   resource: Donation,
//   options: {
//     navigation: {
//       name: 'Donations',
//       icon: 'Money',
//     },
//     properties: {
//       _id: { isVisible: false },
//       amount: {
//         isVisible: {
//           list: false, // hide in list
//           filter: true, // allow filtering
//           show: true, // visible in details
//           edit: true, // editable in form
//         },
//       },
//       itemDetails: {
//         isVisible: {
//           list: false, // hide in list
//           filter: true, // allow filtering
//           show: true, // visible in details
//           edit: true, // editable in form
//         },
//       },
//     },
//     translations: {
//       en: {
//         labels: {
//           DonationSchema: 'Donations', // Resource name override
//         },
//       },
//     },
//     sort: {
//       sortBy: 'createdAt',
//       direction: 'desc',
//     },
//   },
// };

export const DonationRequestResource = {
  resource: DonationRequest,
  options: {
    titleProperty: 'title',
    navigation: {
      name: 'Donations',
      icon: 'DollarSign',
    },
    properties: {
      _id: { isVisible: false },
      title: {
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          list: Components.TextWrapComponent,
        },
      },
      description: {
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          list: Components.DescriptionComponent,
        },
      },
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
    actions: {
      // Mark donation request as read when admin views it
      show: {
        after: async (response, request, context) => {
          try {
            const recordId = response.record?.id || context.record?.id();
            if (recordId) {
              await DonationRequest.findByIdAndUpdate(recordId, {
                isRead: true,
              });
              console.log(
                `[AdminJS] Marked DonationRequest ${recordId} as read`
              );
            }
          } catch (err) {
            console.error(
              '[AdminJS] Error marking DonationRequest as read:',
              err
            );
          }
          return response;
        },
      },
      // Add notification on status change
      edit: {
        after: async (response, request, context) => {
          // Check if this was a successful edit
          if (
            request.method === 'post' &&
            response.record &&
            !response.record.errors
          ) {
            const newStatus = request.payload?.status;
            const oldStatus = context.record?.params?.status;

            if (newStatus && oldStatus !== newStatus) {
              const requesterId = context.record?.params?.requestedBy;
              if (requesterId) {
                try {
                  let notificationTitle, notificationBody, notificationType;

                  // Get the title for more descriptive notifications
                  const requestTitle =
                    context.record?.params?.title || 'donation';

                  if (newStatus === 'accepted') {
                    notificationTitle = 'Donation Request Approved';
                    notificationBody =
                      'Your donation request has been approved and is now visible to donors.';
                    notificationType = 'donation_request_accepted';
                  } else if (newStatus === 'rejected') {
                    notificationTitle = 'Donation Request Update';
                    notificationBody =
                      'Your donation request could not be approved at this time.';
                    notificationType = 'donation_request_rejected';
                  } else if (newStatus === 'completed') {
                    notificationTitle = 'Donation Request Fulfilled';
                    notificationBody = `Your donation request "${requestTitle}" has been completed.`;
                    notificationType = 'donation_request_completed';
                  }

                  if (notificationTitle) {
                    await Notification.create({
                      title: notificationTitle,
                      body: notificationBody,
                      recipientId: requesterId,
                      type: notificationType,
                      data: { donationRequestId: response.record.id },
                    });
                    console.log(
                      `[AdminJS] Created ${notificationType} notification for user ${requesterId}`
                    );
                  }
                } catch (notifError) {
                  console.error(
                    '[AdminJS] Error creating status notification:',
                    notifError
                  );
                }
              }
            }
          }
          return response;
        },
      },
      // Quick Accept action - visible only for pending requests
      accept: {
        actionType: 'record',
        component: false,
        icon: 'Check',
        label: 'Accept',
        guard: 'Are you sure you want to accept this donation request?',
        isVisible: (context) => context.record?.params?.status === 'pending',
        showInDrawer: false,
        handler: async (request, response, context) => {
          const { record, resource } = context;

          try {
            // Update status to accepted
            await DonationRequest.findByIdAndUpdate(record.id(), {
              $set: { status: 'accepted' },
            });

            const requesterId = record.params?.requestedBy;
            const requestTitle = record.params?.title || 'Donation';

            // Notify the requester
            if (requesterId) {
              await Notification.create({
                title: 'Donation Request Approved',
                body: `Your donation request "${requestTitle}" has been approved.`,
                recipientId: requesterId,
                type: 'donation_request_accepted',
                data: { donationRequestId: record.id() },
              });
              console.log(
                `[AdminJS] Created donation_request_accepted notification for user ${requesterId}`
              );
            }

            return {
              record: (await resource.findOne(record.id())).toJSON(
                context.currentAdmin
              ),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message: 'Donation request accepted successfully!',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[AdminJS] Accept action error:', error);
            return {
              record: record.toJSON(context.currentAdmin),
              notice: {
                message: `Error accepting request: ${error.message}`,
                type: 'error',
              },
            };
          }
        },
      },
      // Quick Reject action - visible only for pending requests
      reject: {
        actionType: 'record',
        component: false,
        icon: 'X',
        label: 'Reject',
        guard: 'Are you sure you want to reject this donation request?',
        isVisible: (context) => context.record?.params?.status === 'pending',
        showInDrawer: false,
        handler: async (request, response, context) => {
          const { record, resource } = context;

          try {
            // Update status to rejected
            await DonationRequest.findByIdAndUpdate(record.id(), {
              $set: { status: 'rejected' },
            });

            const requesterId = record.params?.requestedBy;
            const requestTitle = record.params?.title || 'Donation';

            // Notify the requester
            if (requesterId) {
              await Notification.create({
                title: 'Donation Request Update',
                body: `Your donation request "${requestTitle}" could not be approved at this time.`,
                recipientId: requesterId,
                type: 'donation_request_rejected',
                data: { donationRequestId: record.id() },
              });
              console.log(
                `[AdminJS] Created donation_request_rejected notification for user ${requesterId}`
              );
            }

            return {
              record: (await resource.findOne(record.id())).toJSON(
                context.currentAdmin
              ),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message: 'Donation request rejected.',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[AdminJS] Reject action error:', error);
            return {
              record: record.toJSON(context.currentAdmin),
              notice: {
                message: `Error rejecting request: ${error.message}`,
                type: 'error',
              },
            };
          }
        },
      },
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
    navigation: {
      name: 'Aid Operations',
      icon: 'Compass',
    },
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
      createdAt: { isVisible: { list: false, filter: true, show: true, edit: false } },
      updatedAt: { isVisible: { list: false, filter: true, show: true, edit: false } },
    },

    actions: {
      new: {
        handler: async (request, response, context) => {
          const { resource, currentAdmin } = context;

          if (request.method === 'get') {
            return { record: {} };
          }

          const payload = request.payload || {};
          console.log(
            '[DEBUG HANDLER] ReliefCenter new handler - payload keys:',
            Object.keys(payload)
          );

          const updateData = parseReliefCenterPayload(payload);

          // Validate shelter name: letters and spaces only
          if (updateData.shelterName && !/^[A-Za-z\s]+$/.test(updateData.shelterName)) {
            return {
              record: { params: payload, errors: { shelterName: { message: 'Shelter name must contain only letters and spaces (no numbers or special characters)' } } },
              notice: { message: 'Shelter name must contain only letters and spaces', type: 'error' },
            };
          }
          // Validate coordinator name: letters and spaces only
          if (updateData.coordinatorName && !/^[A-Za-z\s]+$/.test(updateData.coordinatorName)) {
            return {
              record: { params: payload, errors: { coordinatorName: { message: 'Coordinator name must contain only letters and spaces (no numbers or special characters)' } } },
              notice: { message: 'Coordinator name must contain only letters and spaces', type: 'error' },
            };
          }
          // Validate coordinator number: digits only, max 10
          if (updateData.coordinatorNumber && !/^\d{1,10}$/.test(updateData.coordinatorNumber)) {
            return {
              record: { params: payload, errors: { coordinatorNumber: { message: 'Coordinator number must contain only digits (max 10)' } } },
              notice: { message: 'Invalid coordinator number', type: 'error' },
            };
          }
          // Validate pinCode: must be a valid integer if provided
          if (updateData.address?.pinCode !== undefined && updateData.address.pinCode !== '') {
            const pinCode = Number(updateData.address.pinCode);
            if (isNaN(pinCode) || !Number.isInteger(pinCode)) {
              return {
                record: { params: payload, errors: { 'address.pinCode': { message: 'PIN code must be a valid integer' } } },
                notice: { message: 'PIN code must be a valid integer', type: 'error' },
              };
            }
          }

          console.log(
            '[DEBUG HANDLER] ReliefCenter create data:',
            JSON.stringify(updateData, null, 2)
          );

          try {
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              ReliefCenter;
            const newRecord = await Model.create(updateData);

            return {
              record: newRecord.toJSON(currentAdmin),
              redirectUrl: context.h.resourceUrl({ resourceId: resource.id() }),
              notice: {
                message: 'Relief Center created successfully',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[DEBUG HANDLER] ReliefCenter create error:', error);
            return {
              record: {
                params: payload,
                errors: { payload: { message: error.message } },
              },
              notice: {
                message: `Error creating: ${error.message}`,
                type: 'error',
              },
            };
          }
        },
      },
      edit: {
        handler: async (request, response, context) => {
          const { resource, record, currentAdmin } = context;

          if (request.method === 'get') {
            return { record: record.toJSON(currentAdmin) };
          }

          const payload = request.payload || {};
          console.log(
            '[DEBUG HANDLER] ReliefCenter edit handler - payload keys:',
            Object.keys(payload)
          );

          const updateData = parseReliefCenterPayload(payload);

          // Validate shelter name: letters and spaces only
          if (updateData.shelterName && !/^[A-Za-z\s]+$/.test(updateData.shelterName)) {
            return {
              record: record.toJSON(currentAdmin),
              notice: { message: 'Shelter name must contain only letters and spaces (no numbers or special characters)', type: 'error' },
            };
          }
          // Validate coordinator name: letters and spaces only
          if (updateData.coordinatorName && !/^[A-Za-z\s]+$/.test(updateData.coordinatorName)) {
            return {
              record: record.toJSON(currentAdmin),
              notice: { message: 'Coordinator name must contain only letters and spaces (no numbers or special characters)', type: 'error' },
            };
          }
          // Validate coordinator number: digits only, max 10
          if (updateData.coordinatorNumber && !/^\d{1,10}$/.test(updateData.coordinatorNumber)) {
            return {
              record: record.toJSON(currentAdmin),
              notice: { message: 'Coordinator number must contain only digits (max 10)', type: 'error' },
            };
          }
          // Validate pinCode: must be a valid integer if provided
          if (updateData.address?.pinCode !== undefined && updateData.address.pinCode !== '') {
            const pinCode = Number(updateData.address.pinCode);
            if (isNaN(pinCode) || !Number.isInteger(pinCode)) {
              return {
                record: record.toJSON(currentAdmin),
                notice: { message: 'PIN code must be a valid integer', type: 'error' },
              };
            }
          }

          console.log(
            '[DEBUG HANDLER] ReliefCenter update data:',
            JSON.stringify(updateData, null, 2)
          );

          try {
            const Model =
              resource._decorated?.mongoose?.model ||
              resource.MongooseModel ||
              ReliefCenter;
            await Model.findByIdAndUpdate(record.id(), { $set: updateData });

            const updatedRecord = await resource.findOne(record.id());

            return {
              record: updatedRecord.toJSON(currentAdmin),
              redirectUrl: context.h.recordActionUrl({
                resourceId: resource.id(),
                recordId: record.id(),
                actionName: 'show',
              }),
              notice: {
                message: 'Relief Center updated successfully',
                type: 'success',
              },
            };
          } catch (error) {
            console.error('[DEBUG HANDLER] ReliefCenter save error:', error);
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
    navigation: {
      name: 'Aid Operations',
      icon: 'Compass',
    },
    properties: {
      _id: { isVisible: false },
      volunteersNeeded: {
        isVisible: { list: false, filter: true, show: true, edit: true },
      },
      assignedVolunteers: {
        reference: 'userProfile',
        isVisible: { list: true, filter: false, show: true, edit: false },
      },
      imageUrl: {
        isVisible: { list: true, filter: false, show: true, edit: true },
        components: {
          list: Components.ImageComponent,
          show: Components.ImageComponent,
          edit: Components.ImageEditComponent,
        },
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
      // Pickup Location - with map display
      pickupLocation: {
        isVisible: { list: true, filter: false, show: true, edit: false },
        components: {
          list: Components.TaskLocationLink,
          show: Components.TaskLocationShow,
        },
      },
      // Delivery Location - with map display
      deliveryLocation: {
        isVisible: { list: true, filter: false, show: true, edit: false },
        components: {
          list: Components.TaskLocationLink,
          show: Components.TaskLocationShow,
        },
      },
      // Legacy location field
      location: {
        isVisible: { list: false, filter: false, show: false, edit: false },
        components: {
          show: Components.TaskLocationShow,
        },
      },
      // Pickup Address display
      pickupAddress: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      // Delivery Address display
      deliveryAddress: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      // Hide nested location fields to prevent duplication
      'pickupLocation.type': { isVisible: false },
      'pickupLocation.coordinates': { isVisible: false },
      'deliveryLocation.type': { isVisible: false },
      'deliveryLocation.coordinates': { isVisible: false },
      'location.type': { isVisible: false },
      'location.coordinates': { isVisible: false },
      // Hide nested address fields (handled by parent display)
      'pickupAddress.addressLine1': { isVisible: false },
      'pickupAddress.addressLine2': { isVisible: false },
      'pickupAddress.addressLine3': { isVisible: false },
      'pickupAddress.pinCode': { isVisible: false },
      'deliveryAddress.addressLine1': { isVisible: false },
      'deliveryAddress.addressLine2': { isVisible: false },
      'deliveryAddress.addressLine3': { isVisible: false },
      'deliveryAddress.pinCode': { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          TaskSchema: 'Task', // Resource name override
        },
        properties: {
          assignedVolunteers: 'Assigned Volunteers',
          volunteersNeeded: 'Volunteers Needed',
          pickupLocation: 'Pickup Location',
          deliveryLocation: 'Delivery Location',
          pickupAddress: 'Pickup Address',
          deliveryAddress: 'Delivery Address',
          pickupLocation:{isVisible: false}
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
    navigation: {
      name: 'User Management',
      icon: 'User',
    },
    properties: {
      resetPassword: { isVisible: false },
      fcmToken: { isVisible: false },
      _id: { isVisible: false },
      password: { isVisible: false },
      passwordResetOtp: { isVisible: false },
      passwordResetOtpExpires: { isVisible: false },
      profileImage: {
        components: {
          list: Components.ImageComponent,
          show: Components.ImageComponent,
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
    navigation: {
      name: 'Content Management',
      icon: 'FileText',
    },
    properties: {
      _id: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          QuizSchema: 'Quiz Questions',
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
    navigation: {
      name: 'Content Management',
      icon: 'FileText',
    },
    properties: {
      _id: { isVisible: false },
    },
    translations: {
      en: {
        labels: {
          DisasterTipSchema: 'Disaster Tips',
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
    navigation: {
      name: 'User Management',
      icon: 'User',
    },
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
      readBy: { 
        isVisible: {list: false, filter: true, show: true} 
        },
      isReadByAll: { isVisible: false },
      createdAt: {
        isVisible: { list: false, filter: true, show: true, edit: false },
      },
      updatedAt: { isVisible: false },
      data: { isVisible: false },
      skipFcm: { isVisible: false },
      sentAt:{
        isVisible: { list: false, filter: true, show: true, edit: false },
      }
    },
    actions: {
      // Use custom form for creating notifications
      // NOTE: FCM is now sent automatically via Notification model post-save hook
      new: {
        component: Components.NotificationForm,
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
    navigation: {
      name: 'Donations',
      icon: 'DollarSign',
    },
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
        component: false,
        icon: 'Check',
        label: 'Approve',
        guard: 'Are you sure you want to approve this donation?',
        isVisible: (context) => context.record?.params?.status === 'submitted',
        handler: async (request, response, context) => {
          const { record, resource } = context;
          await resource.update(record.id(), { status: 'completed' });

          // Send notification to donor if they have an account
          // NOTE: FCM is now sent automatically via Notification model post-save hook
          const donorId = record.params?.donor;
          if (donorId) {
            try {
              await Notification.create({
                title: 'Donation Approved!',
                body: 'Thank you! Your donation has been verified and approved.',
                recipientId: donorId,
                type: 'donation_approved',
                data: { donationId: record.id() }, // Extra data for FCM
              });
              console.log(
                `[AdminJS] Created approval notification for donor ${donorId}`
              );
            } catch (error) {
              console.error(
                '[AdminJS] Error creating approval notification:',
                error
              );
            }
          }

          return {
            record: (await resource.findOne(record.id())).toJSON(
              context.currentAdmin
            ),
            redirectUrl: context.h.recordActionUrl({
              resourceId: resource.id(),
              recordId: record.id(),
              actionName: 'show',
            }),
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
    navigation: {
      name: 'Donations',
      icon: 'DollarSign',
    },
    properties: {
      _id: { isVisible: false },
      transactions: {
        isVisible: { list: false, filter: false, show: true, edit: false },
        
      },
      createdAt: {
        isVisible: { list: false, filter: true, show: true, edit: false },
        
      },
      totalDebits:{
        isVisible: false
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
          // totalDebits: 'Total Funds Used',
          donorCount: 'Number of Donors',
          totalDebits:{
            isVisible: false
          }
        },
      },
    },
  },
};
