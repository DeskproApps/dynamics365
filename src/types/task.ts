export interface ICreateTask {
  subject: string;
  scheduledstart: string;
  scheduledend: string;
  _regardingobjectid_value: string;
  _ownerid_value: string;
  description: string;
}

export interface ITask {
  "@odata.etag": string;
  scheduledstart: string;
  scheduleddurationminutes: number;
  _regardingobjectid_value: string;
  statuscode: number;
  createdon: string;
  statecode: number;
  isbilled: boolean;
  subject: string;
  _ownerid_value: string;
  modifiedon: string;
  versionnumber: number;
  prioritycode: number;
  isregularactivity: boolean;
  scheduledend: string;
  _modifiedby_value: string;
  activitytypecode: string;
  isworkflowcreated: boolean;
  timezoneruleversionnumber: number;
  _createdby_value: string;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  activityid: string;
  actualdurationminutes: number;
  formattedscheduledend: null;
  senton: null;
  exchangeweblink: null;
  actualend: null;
  _slainvokedid_value: null;
  leftvoicemail: null;
  stageid: null;
  lastonholdtime: null;
  ismapiprivate: null;
  sortdate: null;
  _modifiedonbehalfby_value: null;
  _sendermailboxid_value: null;
  description: null;
  processid: null;
  onholdtime: null;
  postponeactivityprocessinguntil: null;
  utcconversiontimezonecode: null;
  actualstart: null;
  descriptionblobid_name: null;
  traversedpath: null;
  _createdonbehalfby_value: null;
  activityadditionalparams: null;
  community: null;
  _owningteam_value: null;
  formattedscheduledstart: null;
  deliveryprioritycode: null;
  exchangerate: null;
  exchangeitemid: null;
  _transactioncurrencyid_value: null;
  deliverylastattemptedon: null;
  descriptionblobid: null;
  seriesid: null;
  _slaid_value: null;
  _serviceid_value: null;
  instancetypecode: null;
  percentcomplete: null;
  overriddencreatedon: null;
  subcategory: null;
  category: null;
  crmtaskassigneduniqueid: null;
  importsequencenumber: null;
  subscriptionid: null;
}