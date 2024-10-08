export interface ICreateLead {
  mobilephone: string;
  emailaddress1: string;
  firstname: string;
  lastname: string;
  companyname: string;
  address1_line1: string;
  address1_city: string;
  address1_stateorprovince: string;
  address1_postalcode: string;
  address1_country: string;
  telephone1: string;
}

export interface ILead {
  currency: string;
  "@odata.etag": string;
  mobilephone: string;
  merged: boolean;
  emailaddress1: string;
  confirminterest: boolean;
  exchangerate: number;
  _parentaccountid_value: string;
  decisionmaker: boolean;
  modifiedon: string;
  revenue_base: number;
  _owninguser_value: string;
  address1_shippingmethodcode: number;
  prioritycode: number;
  address1_composite: string;
  lastname: string;
  donotpostalmail: boolean;
  numberofemployees: number;
  donotphone: boolean;
  preferredcontactmethodcode: number;
  _ownerid_value: string;
  sic: string;
  firstname: string;
  donotemail: boolean;
  evaluatefit: boolean;
  yomifullname: string;
  address2_addresstypecode: number;
  salesstagecode: number;
  address2_shippingmethodcode: number;
  fullname: string;
  address1_addressid: string;
  msdyn_gdproptout: boolean;
  statuscode: number;
  createdon: string;
  address1_stateorprovince: string;
  _msdyn_predictivescoreid_value: string;
  companyname: string;
  donotfax: boolean;
  leadsourcecode: number | string;
  jobtitle: string;
  address1_country: string;
  versionnumber: number;
  address1_line1: string;
  telephone1: string;
  donotsendmm: boolean;
  leadqualitycode: number;
  _transactioncurrencyid_value: string;
  subject: string;
  address1_addresstypecode: number;
  donotbulkemail: boolean;
  _modifiedby_value: string;
  followemail: boolean;
  leadid: string;
  _createdby_value: string;
  websiteurl: string;
  address1_city: string;
  _msdyn_leadkpiid_value: string;
  revenue: number;
  purchasetimeframe: number | string;
  participatesinworkflow: boolean;
  statecode: number;
  _owningbusinessunit_value: string;
  address2_addressid: string;
  address1_postalcode: string;
  telephone3: null;
  businesscardattributes: null;
  address1_upszone: null;
  address2_city: null;
  _slainvokedid_value: null;
  address1_postofficebox: null;
  importsequencenumber: null;
  utcconversiontimezonecode: null;
  schedulefollowup_qualify: null;
  overriddencreatedon: null;
  stageid: null;
  msdyn_leadscore: null;
  address1_latitude: null;
  address1_utcoffset: null;
  yomifirstname: null;
  estimatedclosedate: null;
  _masterid_value: null;
  lastonholdtime: null;
  address2_fax: null;
  address2_line1: null;
  address1_telephone3: null;
  address1_telephone2: null;
  address1_telephone1: null;
  address2_postofficebox: null;
  emailaddress2: null;
  address2_latitude: null;
  processid: null;
  emailaddress3: null;
  address2_composite: null;
  salesstage: null;
  traversedpath: null;
  qualificationcomments: null;
  address2_line2: null;
  teamsfollowed: null;
  budgetamount: null;
  address2_stateorprovince: null;
  address2_postalcode: null;
  estimatedamount: null;
  entityimage_url: null;
  initialcommunication: null;
  msdyn_scorehistory: null;
  timezoneruleversionnumber: null;
  estimatedamount_base: null;
  address2_telephone3: null;
  need: null;
  address2_telephone2: null;
  address2_telephone1: null;
  address2_upszone: null;
  _owningteam_value: null;
  budgetstatus: null;
  address2_line3: null;
  timespentbymeonemailandmeetings: null;
  businesscard: null;
  address2_longitude: null;
  _modifiedonbehalfby_value: null;
  address1_line2: null;
  address1_county: null;
  schedulefollowup_prospect: null;
  msdyn_leadscoretrend: null;
  address1_fax: null;
  _createdonbehalfby_value: null;
  _accountid_value: null;
  address2_name: null;
  msdyn_leadgrade: null;
  msdyn_scorereasons: null;
  address2_utcoffset: null;
  _campaignid_value: null;
  _slaid_value: null;
  fax: null;
  address2_county: null;
  _qualifyingopportunityid_value: null;
  msdyn_salesassignmentresult: null;
  address1_line3: null;
  _parentcontactid_value: null;
  industrycode: null;
  purchaseprocess: null;
  onholdtime: null;
  entityimage_timestamp: null;
  _customerid_value: null;
  entityimageid: null;
  lastusedincampaign: null;
  _msdyn_segmentid_value: null;
  _originatingcaseid_value: null;
  telephone2: null;
  yomilastname: null;
  description: null;
  _relatedobjectid_value: null;
  _contactid_value: null;
  yomimiddlename: null;
  budgetamount_base: null;
  address1_name: null;
  yomicompanyname: null;
  address1_longitude: null;
  entityimage: null;
  middlename: null;
  estimatedvalue: null;
  salutation: null;
  pager: null;
  address2_country: null;
}
