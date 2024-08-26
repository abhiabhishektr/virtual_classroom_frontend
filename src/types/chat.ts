export interface IGroup {
    groupId: string;
    teacherEmail: string;
    groupName: string;
  }

  export interface IMessage {
    sender_id: string;
    senderName: string;
    content: string;
    timestamp?: Date; 
    isRead?: boolean;
    senderEmail?: string;
    name?: string; 
  }