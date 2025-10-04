import { TemplateDefinition } from '../state/store';

export const templates: TemplateDefinition[] = [
  {
    key: 'excel-row-alert',
    title: 'Excel Row Alert',
    description:
      'Send an email alert when a condition is met in an Excel table row stored in SharePoint.',
    parameters: [
      { id: 'sharePointSiteURL', label: 'SharePoint Site URL', type: 'text', required: true },
      { id: 'documentLibrary', label: 'Document Library', type: 'text', required: true },
      { id: 'fileName', label: 'Excel File Name', type: 'text', required: true },
      { id: 'tableName', label: 'Table Name', type: 'text', required: true },
      { id: 'conditionColumn', label: 'Condition Column', type: 'text', required: true },
      { id: 'conditionValue', label: 'Condition Value', type: 'text', required: true },
      { id: 'emailToColumn', label: 'Email To Column', type: 'text', required: true },
      { id: 'emailSubject', label: 'Email Subject', type: 'text', required: true },
      { id: 'emailBody', label: 'Email Body', type: 'textarea', required: false },
    ],
  },
  {
    key: 'list-digest',
    title: 'SharePoint List Item Digest',
    description: 'Send a summary email of items in a SharePoint list or view.',
    parameters: [
      { id: 'sharepointList', label: 'SharePoint List URL', type: 'text', required: true },
      { id: 'viewName', label: 'SharePoint List View Name', type: 'text', required: false },
      { id: 'emailRecipients', label: 'Recipients', type: 'text', required: true },
      { id: 'emailSubject', label: 'Email Subject', type: 'text', required: true },
    ],
  },
  {
    key: 'teams-message',
    title: 'Teams Channel Message',
    description: 'Post a message to a Microsoft Teams channel.',
    parameters: [
      { id: 'teamId', label: 'Team ID', type: 'text', required: true },
      { id: 'channelId', label: 'Channel ID', type: 'text', required: true },
      { id: 'messageContent', label: 'Message Content', type: 'textarea', required: true },
    ],
  },
];
