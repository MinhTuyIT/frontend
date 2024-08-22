import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
  Upload: any;
};

export enum AccountType {
  Checking = 'CHECKING',
  Savings = 'SAVINGS'
}

export type Address = {
  __typename?: 'Address';
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['ID'];
  state: Scalars['String'];
  zip: Scalars['String'];
};

export type Auction = {
  __typename?: 'Auction';
  auctionImages?: Maybe<Array<AuctionImage>>;
  bidCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  currentBid?: Maybe<Scalars['Float']>;
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  itemId: Scalars['String'];
  publicId: Scalars['Int'];
  startPrice: Scalars['Float'];
  startsAt: Scalars['DateTime'];
  status?: Maybe<AuctionStatus>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AuctionConnection = {
  __typename?: 'AuctionConnection';
  edges: Array<AuctionEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type AuctionEdge = {
  __typename?: 'AuctionEdge';
  cursor: Scalars['String'];
  node: Auction;
};

export type AuctionImage = {
  __typename?: 'AuctionImage';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  path: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export enum AuctionStatus {
  Draft = 'DRAFT',
  Ended = 'ENDED',
  Live = 'LIVE',
  Scheduled = 'SCHEDULED'
}

export enum AuthAllow {
  Groups = 'groups',
  Private = 'private'
}

export type AuthRule = {
  allow: AuthAllow;
  groups?: InputMaybe<Array<Group>>;
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  /** The access token issued to the user upon successful authentication. */
  AccessToken: Scalars['String'];
  /** The lifespan of the access token, in seconds. */
  ExpiresIn: Scalars['Int'];
  /** The ID token that contains the user's identity information. */
  IdToken: Scalars['String'];
  /** A refresh token that can be used to obtain new access tokens. */
  RefreshToken?: Maybe<Scalars['String']>;
  /** The type of token issued, typically "Bearer". */
  TokenType: Scalars['String'];
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Float'];
  auctionId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type BreakInput = {
  timeInAt: Scalars['DateTime'];
  timeOutAt: Scalars['DateTime'];
};

export type BreakLog = {
  __typename?: 'BreakLog';
  createdAt: Scalars['DateTime'];
  dailyLogId: Scalars['ID'];
  id: Scalars['ID'];
  timeInAt: Scalars['DateTime'];
  timeOutAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BreakLogInput = {
  timeInAt: Scalars['DateTime'];
  timeOutAt: Scalars['DateTime'];
};

export type CancelJobInput = {
  id: Scalars['ID'];
};

export type ChallengeParametersResult = {
  __typename?: 'ChallengeParametersResult';
  /** The username associated with the challenge, typically used for custom authentication flows. */
  USERNAME?: Maybe<Scalars['String']>;
  /** The current number of sign-in attempts that have been made. */
  attempts: Scalars['String'];
  /** The number of attempts left before the account is locked or requires additional verification. */
  attemptsLeft: Scalars['String'];
  /** The email address associated with the user's account, which may be used for sending OTPs or notifications. */
  email?: Maybe<Scalars['String']>;
  /** The maximum allowed sign-in attempts. */
  maxAttempts: Scalars['String'];
};

export type ChallengeResult = {
  __typename?: 'ChallengeResult';
  /** The name of the challenge that the user must complete to sign in, such as verifying an OTP. */
  ChallengeName: Scalars['String'];
  /** Additional parameters related to the challenge, providing context such as attempts and email. */
  ChallengeParameters: ChallengeParametersResult;
  /** A session token used to maintain the sign-in challenge state. */
  Session: Scalars['String'];
};

export type ClockInInput = {
  clockInAt: Scalars['DateTime'];
};

export type ClockOutInput = {
  clockOutAt: Scalars['DateTime'];
};

export type CognitoGroup = {
  __typename?: 'CognitoGroup';
  CreationDate?: Maybe<Scalars['DateTime']>;
  Description?: Maybe<Scalars['String']>;
  GroupName: Scalars['String'];
  LastModifiedDate?: Maybe<Scalars['DateTime']>;
  Precedence?: Maybe<Scalars['Int']>;
  RoleArn?: Maybe<Scalars['String']>;
  UserPoolId: Scalars['String'];
};

export type CognitoUser = {
  __typename?: 'CognitoUser';
  Attributes?: Maybe<Array<CognitoUserAttribute>>;
  Enabled: Scalars['Boolean'];
  UserAttributes?: Maybe<Array<CognitoUserAttribute>>;
  UserStatus: CognitoUserStatus;
  Username: Scalars['String'];
};

export type CognitoUserAttribute = {
  __typename?: 'CognitoUserAttribute';
  Name: Scalars['String'];
  Value: Scalars['String'];
};

export enum CognitoUserStatus {
  Confirmed = 'CONFIRMED',
  ForceChangePassword = 'FORCE_CHANGE_PASSWORD',
  ResetRequired = 'RESET_REQUIRED',
  Unconfirmed = 'UNCONFIRMED',
  Unknown = 'UNKNOWN'
}

export type CompleteAccountInput = {
  email: Scalars['String'];
  /** The temporary password sent to the user's email after being created using AdminCreateUserCommand. */
  otpCode: Scalars['String'];
  /** The new password that the user will use to sign in. */
  password: Scalars['String'];
};

export type ConfirmSignInInput = {
  /** The identifier used to sign in. This can be an email or phone number. */
  identifier: Scalars['String'];
  /** This is the 6-digit code sent via email or sms */
  otpCode: Scalars['String'];
  /** This is the session token returned from the signIn mutation. */
  session: Scalars['String'];
};

export type ConfirmSignInResult = {
  __typename?: 'ConfirmSignInResult';
  /** The authentication result, including tokens and authentication-related information. */
  data: AuthenticationResult;
  /** A message indicating the result of the confirm sign-in process, such as success or failure reasons. */
  message: Scalars['String'];
};

export type ConfirmSignInResultOrSignInResult = ConfirmSignInResult | Message | SignInResult;

export type ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Consignor = {
  __typename?: 'Consignor';
  address?: Maybe<Address>;
  balance: Scalars['Float'];
  company?: Maybe<Scalars['String']>;
  consignorPaymentMethods?: Maybe<Array<ConsignorPaymentMethod>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  notified: Scalars['Boolean'];
  payoutMethods?: Maybe<Array<PayoutMethod>>;
  phone?: Maybe<Scalars['String']>;
  publicId: Scalars['Int'];
  secondaryEmail?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type ConsignorConnection = {
  __typename?: 'ConsignorConnection';
  edges: Array<ConsignorEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type ConsignorEdge = {
  __typename?: 'ConsignorEdge';
  cursor: Scalars['String'];
  node: Consignor;
};

export type ConsignorPaymentMethod = {
  __typename?: 'ConsignorPaymentMethod';
  consignorId: Scalars['String'];
  detail?: Maybe<ConsignorPaymentMethodDetail>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  type: ConsignorPaymentType;
};

export type ConsignorPaymentMethodDetail = {
  __typename?: 'ConsignorPaymentMethodDetail';
  accountNumber?: Maybe<Scalars['String']>;
  accountType?: Maybe<AccountType>;
  bankAddress?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type ConsignorPaymentMethodDetailInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  accountType?: InputMaybe<AccountType>;
  bankAddress?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  routingNumber?: InputMaybe<Scalars['String']>;
};

export enum ConsignorPaymentType {
  Ach = 'ACH',
  Check = 'CHECK',
  Paypal = 'PAYPAL',
  Wire = 'WIRE'
}

export type CreateAddressInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
};

export type CreateAuctionInput = {
  endsAt: Scalars['DateTime'];
  imagePaths: Array<Scalars['String']>;
  itemId: Scalars['String'];
  startPrice: Scalars['Float'];
  startsAt: Scalars['DateTime'];
  status?: InputMaybe<AuctionStatus>;
  title: Scalars['String'];
};

export type CreateConsignorInput = {
  address: CreateAddressInput;
  balance: Scalars['Float'];
  company?: InputMaybe<Scalars['String']>;
  consignorPaymentMethods?: InputMaybe<Array<CreateConsignorPaymentMethodInput>>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  notify?: InputMaybe<Scalars['Boolean']>;
  payoutMethods?: InputMaybe<Array<CreatePayoutMethodInput>>;
  phone?: InputMaybe<Scalars['String']>;
  secondaryEmail?: InputMaybe<Scalars['String']>;
};

export type CreateConsignorPaymentMethodInput = {
  detail?: InputMaybe<ConsignorPaymentMethodDetailInput>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  type: ConsignorPaymentType;
};

export type CreateMySubmissionInput = {
  note?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
};

export type CreatePaymentMethodInput = {
  isDefault?: InputMaybe<Scalars['Boolean']>;
  methodType: PaymentType;
  setupIntentId: Scalars['String'];
};

export type CreatePayoutMethodInput = {
  detail?: InputMaybe<PayoutMethodDetailInput>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  type: PayoutType;
};

export type CreateSubmissionInput = {
  carrier?: InputMaybe<Scalars['String']>;
  consignorId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
  trackingNumber?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  group: Group;
  lastName: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DailyLog = {
  __typename?: 'DailyLog';
  breakLogs: Array<BreakLog>;
  clockInAt?: Maybe<Scalars['DateTime']>;
  clockOutAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  date: Scalars['String'];
  id: Scalars['ID'];
  staffId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type GetUploadUrlResponse = {
  __typename?: 'GetUploadUrlResponse';
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export enum Group {
  Admins = 'Admins',
  Consignors = 'Consignors',
  Staffs = 'Staffs',
  Supers = 'Supers'
}

export type Item = {
  __typename?: 'Item';
  auction?: Maybe<Auction>;
  createdAt: Scalars['DateTime'];
  grade?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jobId: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  publicId: Scalars['Int'];
  shelfLocation?: Maybe<Scalars['String']>;
  soldPrice?: Maybe<Scalars['Float']>;
  status: ItemStatus;
  updatedAt: Scalars['DateTime'];
};

export type ItemConnection = {
  __typename?: 'ItemConnection';
  edges: Array<ItemEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type ItemEdge = {
  __typename?: 'ItemEdge';
  cursor: Scalars['String'];
  node: Item;
};

export type ItemInput = {
  grade?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export enum ItemStatus {
  Paid = 'PAID',
  Posted = 'POSTED',
  Scripted = 'SCRIPTED',
  Shipped = 'SHIPPED',
  Sold = 'SOLD'
}

export type Job = {
  __typename?: 'Job';
  completedAt?: Maybe<Scalars['DateTime']>;
  consignor?: Maybe<Consignor>;
  createdAt: Scalars['DateTime'];
  createdDate: Scalars['Int'];
  id: Scalars['ID'];
  items?: Maybe<Array<Item>>;
  jobType: JobType;
  orders?: Maybe<Array<Order>>;
  poster?: Maybe<Staff>;
  publicId: Scalars['String'];
  quantity: Scalars['Int'];
  scripter?: Maybe<Staff>;
  shipper?: Maybe<Staff>;
  staff?: Maybe<Staff>;
  startedAt?: Maybe<Scalars['DateTime']>;
  status: JobStatus;
  submissionId?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['DateTime'];
};

export type JobConnection = {
  __typename?: 'JobConnection';
  edges: Array<JobEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type JobEdge = {
  __typename?: 'JobEdge';
  cursor: Scalars['String'];
  node: Job;
};

export type JobLog = {
  __typename?: 'JobLog';
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  jobId: Scalars['ID'];
  staff?: Maybe<Staff>;
  startedAt?: Maybe<Scalars['DateTime']>;
  status: JobStatus;
  updatedAt: Scalars['DateTime'];
};

export enum JobStatus {
  Pending = 'PENDING',
  Posted = 'POSTED',
  Posting = 'POSTING',
  ReadyToShip = 'READY_TO_SHIP',
  Scripted = 'SCRIPTED',
  Scripting = 'SCRIPTING',
  Shipped = 'SHIPPED',
  Shipping = 'SHIPPING'
}

export enum JobType {
  Inbound = 'INBOUND',
  Outbound = 'OUTBOUND'
}

export type ListAuctionFilterInput = {
  status?: InputMaybe<AuctionStatus>;
};

export type ListConsignorFilterInput = {
  email?: InputMaybe<Scalars['String']>;
};

export type ListItemFilterInput = {
  grade?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ItemStatus>;
};

export type ListJobFilterInput = {
  jobType?: InputMaybe<JobType>;
  statuses?: InputMaybe<Array<JobStatus>>;
};

export type ListJobOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
  createdDate?: InputMaybe<OrderByDirection>;
  publicId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type ListOrderFilterInput = {
  status?: InputMaybe<OrderStatus>;
};

export type ListSubmissionFiltersInput = {
  consignorId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SubmissionStatus>;
};

export type ListUserFiltersInput = {
  email?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<Group>>>;
};

export type Message = {
  __typename?: 'Message';
  /** A generic message response, often used for operations that return a confirmation or status message. */
  message: Scalars['String'];
};

export type ModifyUserCognitoGroupsInput = {
  groupName: Scalars['String'];
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToCognitoGroup: User;
  break: DailyLog;
  cancelJob: Job;
  clockIn: DailyLog;
  clockOut: DailyLog;
  /** Complete the account for the user created by the System Administrator. Also log the user into the system. */
  completeAccount: Message;
  /** Confirms the sign in process for a user. This will verify the OTP sent to the user's email or phone number. */
  confirmSignIn: ConfirmSignInResultOrSignInResult;
  createAddress: Address;
  createAuction: Auction;
  createConsignor: Consignor;
  createMySubmission: Submission;
  createPaymentMethod: PaymentMethod;
  createPayoutMethod: PayoutMethod;
  createSetupIntent: SetupIntent;
  createSubmission: Submission;
  createUser: User;
  deleteFile: Scalars['String'];
  deleteFiles: Array<Scalars['String']>;
  /** Returns fresh tokens for the user. This is useful for refreshing the user's tokens when they are about to expire. */
  refreshToken: ConfirmSignInResult;
  removeAddress: Address;
  removeAuction: Auction;
  removeConsignor: Consignor;
  removeItem: Item;
  removeJob: Job;
  removePaymentMethod: PaymentMethod;
  removePayoutMethod: PayoutMethod;
  removeSubmission: Submission;
  removeUser: User;
  removeUserFromCognitoGroup: User;
  /** Resends the OTP to the user's email or phone number. */
  resendOTP: SignInResult;
  /** Initiates a sign in process for a user. This will send an OTP to the user's email or phone number. */
  signIn: ConfirmSignInResultOrSignInResult;
  signOut: Message;
  /** Sign up a new user with email and password. */
  signUp: ConfirmSignInResult;
  startPosting: Job;
  startScripting: Job;
  startShipping: Job;
  submitPosting: Job;
  submitScripting: Job;
  submitShipping: Job;
  updateAddress: Address;
  updateAuction: Auction;
  updateConsignor: Consignor;
  updateItem: Item;
  updateItems: Array<Item>;
  updateJob: Job;
  updateMe: User;
  updateMySubmission: Submission;
  updatePaymentMethod: PaymentMethod;
  updatePayoutMethod: PayoutMethod;
  updateSubmission: Submission;
  updateUser: User;
};


export type MutationAddUserToCognitoGroupArgs = {
  input: ModifyUserCognitoGroupsInput;
};


export type MutationBreakArgs = {
  input: BreakInput;
};


export type MutationCancelJobArgs = {
  input: CancelJobInput;
};


export type MutationClockInArgs = {
  input: ClockInInput;
};


export type MutationClockOutArgs = {
  input: ClockOutInput;
};


export type MutationCompleteAccountArgs = {
  input: CompleteAccountInput;
};


export type MutationConfirmSignInArgs = {
  confirmSignInInput: ConfirmSignInInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateAuctionArgs = {
  input?: InputMaybe<CreateAuctionInput>;
};


export type MutationCreateConsignorArgs = {
  input: CreateConsignorInput;
};


export type MutationCreateMySubmissionArgs = {
  input: CreateMySubmissionInput;
};


export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationCreatePayoutMethodArgs = {
  input: CreatePayoutMethodInput;
};


export type MutationCreateSubmissionArgs = {
  input: CreateSubmissionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteFileArgs = {
  filePath: Scalars['String'];
};


export type MutationDeleteFilesArgs = {
  filePaths: Array<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRemoveAddressArgs = {
  input: RemoveAddressInput;
};


export type MutationRemoveAuctionArgs = {
  input?: InputMaybe<RemoveAuctionInput>;
};


export type MutationRemoveConsignorArgs = {
  input: RemoveConsignorInput;
};


export type MutationRemoveItemArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveJobArgs = {
  input: RemoveJobInput;
};


export type MutationRemovePaymentMethodArgs = {
  input: RemovePaymentMethodInput;
};


export type MutationRemovePayoutMethodArgs = {
  input: RemovePayoutMethodInput;
};


export type MutationRemoveSubmissionArgs = {
  input: RemoveSubmissionInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserFromCognitoGroupArgs = {
  input: ModifyUserCognitoGroupsInput;
};


export type MutationResendOtpArgs = {
  resendOtpInput: ResendOtpInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationStartPostingArgs = {
  input: StartJobInput;
};


export type MutationStartScriptingArgs = {
  input: StartJobInput;
};


export type MutationStartShippingArgs = {
  input: StartJobInput;
};


export type MutationSubmitPostingArgs = {
  input: SubmitPostingInput;
};


export type MutationSubmitScriptingArgs = {
  input: SubmitScriptingInput;
};


export type MutationSubmitShippingArgs = {
  input: SubmitShippingInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateAuctionArgs = {
  input?: InputMaybe<UpdateAuctionInput>;
};


export type MutationUpdateConsignorArgs = {
  input: UpdateConsignorInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdateItemsArgs = {
  input: UpdateItemsInput;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdateMySubmissionArgs = {
  input: UpdateMySubmissionInput;
};


export type MutationUpdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};


export type MutationUpdatePayoutMethodArgs = {
  input: UpdatePayoutMethodInput;
};


export type MutationUpdateSubmissionArgs = {
  input: UpdateSubmissionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  address: Address;
  addressId: Scalars['ID'];
  consignor: Consignor;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Array<Item>;
  jobId: Scalars['ID'];
  paidAt?: Maybe<Scalars['DateTime']>;
  publicId: Scalars['Int'];
  shippingMethod?: Maybe<Scalars['String']>;
  status: OrderStatus;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String'];
  node: Order;
};

export type OrderInput = {
  id: Scalars['ID'];
  isShipped?: InputMaybe<Scalars['Boolean']>;
};

export enum OrderStatus {
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Paid = 'PAID',
  Shipped = 'SHIPPED'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  details: StripePaymentMethodDetail;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  methodType: PaymentType;
  userId: Scalars['String'];
};

export type PaymentMethodConnection = {
  __typename?: 'PaymentMethodConnection';
  edges: Array<PaymentMethodEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type PaymentMethodEdge = {
  __typename?: 'PaymentMethodEdge';
  cursor: Scalars['String'];
  node: PaymentMethod;
};

export enum PaymentType {
  Card = 'CARD'
}

export type PayoutMethod = {
  __typename?: 'PayoutMethod';
  consignorId: Scalars['String'];
  detail?: Maybe<PayoutMethodDetail>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  type: PayoutType;
};

export type PayoutMethodConnection = {
  __typename?: 'PayoutMethodConnection';
  edges: Array<PayoutMethodEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type PayoutMethodDetail = {
  __typename?: 'PayoutMethodDetail';
  accountNumber?: Maybe<Scalars['String']>;
  accountType?: Maybe<AccountType>;
  bankAddress?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type PayoutMethodDetailInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  accountType?: InputMaybe<AccountType>;
  bankAddress?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  routingNumber?: InputMaybe<Scalars['String']>;
};

export type PayoutMethodEdge = {
  __typename?: 'PayoutMethodEdge';
  cursor: Scalars['String'];
  node: PayoutMethod;
};

export enum PayoutType {
  Ach = 'ACH',
  Check = 'CHECK',
  Paypal = 'PAYPAL',
  Wire = 'WIRE'
}

export type Query = {
  __typename?: 'Query';
  getAddress?: Maybe<Address>;
  getAuction: Auction;
  getBuyer: User;
  getConsignor: Consignor;
  getItem?: Maybe<Item>;
  getJob: Job;
  getMyStripeCustomerId: Scalars['String'];
  getOrder?: Maybe<Order>;
  getPaymentMethod: PaymentMethod;
  getPayoutMethod: PayoutMethod;
  getSubmission: Submission;
  getUploadUrl: GetUploadUrlResponse;
  getUser: User;
  getWarehouseAddress: Scalars['String'];
  listAuctions: AuctionConnection;
  listBuyers: UserConnection;
  listCognitoGroups: Array<CognitoGroup>;
  listConsignors: ConsignorConnection;
  listItems: ItemConnection;
  listJobs: JobConnection;
  listMyAddresses?: Maybe<Array<Address>>;
  listMyPaymentMethods: PaymentMethodConnection;
  listMyPayoutMethods: PayoutMethodConnection;
  listOrders: OrderConnection;
  listStaffs: StaffConnection;
  listSubmissions: SubmissionConnection;
  listUsers: UserConnection;
  me: User;
  myDailyLog: DailyLog;
};


export type QueryGetAddressArgs = {
  id: Scalars['ID'];
};


export type QueryGetAuctionArgs = {
  id: Scalars['ID'];
};


export type QueryGetBuyerArgs = {
  id: Scalars['ID'];
};


export type QueryGetConsignorArgs = {
  id: Scalars['ID'];
};


export type QueryGetItemArgs = {
  id: Scalars['ID'];
};


export type QueryGetJobArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};


export type QueryGetPaymentMethodArgs = {
  id: Scalars['ID'];
};


export type QueryGetPayoutMethodArgs = {
  id: Scalars['ID'];
};


export type QueryGetSubmissionArgs = {
  id: Scalars['ID'];
};


export type QueryGetUploadUrlArgs = {
  fileName: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryListAuctionsArgs = {
  filters?: InputMaybe<ListAuctionFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListBuyersArgs = {
  connectionArgs?: InputMaybe<ConnectionArgs>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListConsignorsArgs = {
  connectionArgs?: InputMaybe<ConnectionArgs>;
  filters?: InputMaybe<ListConsignorFilterInput>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryListItemsArgs = {
  filters?: InputMaybe<ListItemFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListJobsArgs = {
  filters?: InputMaybe<ListJobFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListJobOrderByInput>;
  ownFirst?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListMyPaymentMethodsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListMyPayoutMethodsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListOrdersArgs = {
  filters?: InputMaybe<ListOrderFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListStaffsArgs = {
  connectionArgs?: InputMaybe<ConnectionArgs>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryListSubmissionsArgs = {
  connectionArgs?: InputMaybe<ConnectionArgs>;
  filters?: InputMaybe<ListSubmissionFiltersInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryListUsersArgs = {
  connectionArgs?: InputMaybe<ConnectionArgs>;
  filters?: InputMaybe<ListUserFiltersInput>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type RefreshTokenInput = {
  /** The refresh token previously issued to the user, used to obtain new access and ID tokens. */
  refreshToken: Scalars['String'];
};

export type RemoveAddressInput = {
  id: Scalars['ID'];
};

export type RemoveAuctionInput = {
  id: Scalars['ID'];
};

export type RemoveConsignorInput = {
  id: Scalars['ID'];
};

export type RemoveJobInput = {
  id: Scalars['ID'];
};

export type RemovePaymentMethodInput = {
  id: Scalars['ID'];
};

export type RemovePayoutMethodInput = {
  id: Scalars['String'];
};

export type RemoveSubmissionInput = {
  id: Scalars['ID'];
};

export type ResendOtpInput = {
  /** The identifier used for the sign-in process. This can be an email or phone number, to which the OTP will be resent. */
  identifier: Scalars['String'];
};

export type SetupIntent = {
  __typename?: 'SetupIntent';
  customer: Scalars['String'];
  ephemeralKey: Scalars['String'];
  setupIntent: Scalars['String'];
};

export type SignInInput = {
  /** The identifier used to sign in. This can be an email or phone number. */
  identifier: Scalars['String'];
  /** The password used to sign in directly without sending an OTP */
  password?: InputMaybe<Scalars['String']>;
};

export type SignInResult = {
  __typename?: 'SignInResult';
  /** Data related to the sign-in challenge, if a challenge is required for completion. */
  data: ChallengeResult;
  /** A message indicating the result of the sign-in attempt, such as success or failure reasons. */
  message: Scalars['String'];
};

export type SignUpInput = {
  /** The email used to sign in */
  email: Scalars['String'];
  /** The password used to sign in */
  password: Scalars['String'];
};

export type Staff = {
  __typename?: 'Staff';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  publicId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type StaffConnection = {
  __typename?: 'StaffConnection';
  edges: Array<StaffEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type StaffEdge = {
  __typename?: 'StaffEdge';
  cursor: Scalars['String'];
  node: Staff;
};

export type StartJobInput = {
  id: Scalars['ID'];
  staffId?: InputMaybe<Scalars['ID']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
};

export enum StripeCardBrand {
  Amex = 'amex',
  Diners = 'diners',
  Discover = 'discover',
  EftposAu = 'eftpos_au',
  Jcb = 'jcb',
  Mastercard = 'mastercard',
  Unionpay = 'unionpay',
  Unknown = 'unknown',
  Visa = 'visa'
}

export type StripePaymentMethodDetail = {
  __typename?: 'StripePaymentMethodDetail';
  brand: StripeCardBrand;
  createdAt: Scalars['Int'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  fingerprint: Scalars['String'];
  last4: Scalars['String'];
  paymentMethodId: Scalars['String'];
  setupIntentId: Scalars['String'];
};

export type Submission = {
  __typename?: 'Submission';
  carrier?: Maybe<Scalars['String']>;
  consignor?: Maybe<Consignor>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  jobs?: Maybe<Array<Job>>;
  note?: Maybe<Scalars['String']>;
  publicId: Scalars['Int'];
  quantity: Scalars['Int'];
  status: SubmissionStatus;
  trackingNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type SubmissionConnection = {
  __typename?: 'SubmissionConnection';
  edges: Array<SubmissionEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type SubmissionEdge = {
  __typename?: 'SubmissionEdge';
  cursor: Scalars['String'];
  node: Submission;
};

export enum SubmissionStatus {
  Draft = 'DRAFT',
  Pending = 'PENDING',
  Processed = 'PROCESSED'
}

export type SubmitPostingInput = {
  completedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
};

export type SubmitScriptingInput = {
  completedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  items: Array<ItemInput>;
};

export type SubmitShippingInput = {
  completedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  orders?: InputMaybe<Array<OrderInput>>;
};

export type UpdateAddressInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateAuctionInput = {
  endsAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  imagePaths?: InputMaybe<Array<Scalars['String']>>;
  startPrice?: InputMaybe<Scalars['Float']>;
  startsAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateConsignorAddressInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateConsignorInput = {
  address?: InputMaybe<UpdateConsignorAddressInput>;
  balance?: InputMaybe<Scalars['Float']>;
  company?: InputMaybe<Scalars['String']>;
  consignorPaymentMethods?: InputMaybe<Array<InputMaybe<UpdateConsignorPaymentMethodInput>>>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  notify?: InputMaybe<Scalars['Boolean']>;
  payoutMethods?: InputMaybe<Array<InputMaybe<UpdatePayoutMethodInput>>>;
  phone?: InputMaybe<Scalars['String']>;
  secondaryEmail?: InputMaybe<Scalars['String']>;
};

export type UpdateConsignorPaymentMethodInput = {
  detail?: InputMaybe<ConsignorPaymentMethodDetailInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<ConsignorPaymentType>;
};

export type UpdateItemInput = {
  grade?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  shelfLocation?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ItemStatus>;
};

export type UpdateItemsInput = {
  items: Array<UpdateItemInput>;
};

export type UpdateJobInput = {
  completedAt?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  staffId?: InputMaybe<Scalars['ID']>;
  startedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateMeConsignorInput = {
  phone?: InputMaybe<Scalars['String']>;
  secondaryEmail?: InputMaybe<Scalars['String']>;
};

export type UpdateMeInput = {
  consignor?: InputMaybe<UpdateMeConsignorInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type UpdateMySubmissionInput = {
  carrier?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  trackingNumber?: InputMaybe<Scalars['String']>;
};

export type UpdatePaymentMethodInput = {
  id: Scalars['ID'];
  isDefault?: InputMaybe<Scalars['Boolean']>;
  methodType?: InputMaybe<PaymentType>;
  setupIntentId?: InputMaybe<Scalars['String']>;
};

export type UpdatePayoutMethodInput = {
  detail?: InputMaybe<PayoutMethodDetailInput>;
  id: Scalars['ID'];
  isDefault?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<PayoutType>;
};

export type UpdateProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isOpenFirstSignUp?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateSubmissionInput = {
  carrier?: InputMaybe<Scalars['String']>;
  consignorId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  jobs?: InputMaybe<Array<UpdateSubmissionJobInput>>;
  note?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<SubmissionStatus>;
  trackingNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateSubmissionJobInput = {
  quantity: Scalars['Int'];
  staffId?: InputMaybe<Scalars['ID']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Group>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** Represents a user. This can be a partner or an admin, depending on the group they belong to. */
export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Address>>;
  cognitoGroups: Array<CognitoGroup>;
  cognitoUser: CognitoUser;
  consignor?: Maybe<Consignor>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  group?: Maybe<Group>;
  id: Scalars['ID'];
  isRegisteredBidder: Scalars['Boolean'];
  lastName: Scalars['String'];
  locale: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  /** The webhook URL to receive POST request updates for 'Submission' records created by this user. */
  notificationUrl?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  payoutMethods?: Maybe<Array<PayoutMethod>>;
  phoneNumber?: Maybe<Scalars['String']>;
  publicId: Scalars['Int'];
  /** The staff record associated with this user. Only defined if the user is a staff member. */
  staff?: Maybe<Staff>;
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalEdges: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type AccountManagementUpdateMeMutationVariables = Exact<{
  input: UpdateMeInput;
}>;


export type AccountManagementUpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', lastName: string, firstName: string, group?: Group | null, consignor?: { __typename?: 'Consignor', secondaryEmail?: string | null, phone?: string | null } | null } };

export type PayoutMethodDetailFragment = { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null };

export type PayoutMethodInfoFragment = { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null };

export type AccountManagementListMyPayoutMethodsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderByInput>;
}>;


export type AccountManagementListMyPayoutMethodsQuery = { __typename?: 'Query', listMyPayoutMethods: { __typename?: 'PayoutMethodConnection', edges: Array<{ __typename?: 'PayoutMethodEdge', node: { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null } }> } };

export type AccountManagementGetPayoutMethodQueryVariables = Exact<{
  getPayoutMethodId: Scalars['ID'];
}>;


export type AccountManagementGetPayoutMethodQuery = { __typename?: 'Query', getPayoutMethod: { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null } };

export type AccountManagementCreatePayoutMethodMutationVariables = Exact<{
  input: CreatePayoutMethodInput;
}>;


export type AccountManagementCreatePayoutMethodMutation = { __typename?: 'Mutation', createPayoutMethod: { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null } };

export type AccountManagementUpdatePayoutMethodMutationVariables = Exact<{
  input: UpdatePayoutMethodInput;
}>;


export type AccountManagementUpdatePayoutMethodMutation = { __typename?: 'Mutation', updatePayoutMethod: { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null } };

export type AccountManagementRemovePayoutMethodMutationVariables = Exact<{
  input: RemovePayoutMethodInput;
}>;


export type AccountManagementRemovePayoutMethodMutation = { __typename?: 'Mutation', removePayoutMethod: { __typename?: 'PayoutMethod', type: PayoutType, id: string, detail?: { __typename?: 'PayoutMethodDetail', email?: string | null, bankName?: string | null, accountNumber?: string | null, accountType?: AccountType | null, routingNumber?: string | null, bankAddress?: string | null } | null } };

export type AccountManagementStripePaymentMethodDetailFragment = { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string };

export type AccountManagementPaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, methodType: PaymentType, userId: string, isDefault: boolean, details: { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string } };

export type AccountManagementListMyPaymentMethodsQueryVariables = Exact<{
  orderBy?: InputMaybe<OrderByInput>;
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type AccountManagementListMyPaymentMethodsQuery = { __typename?: 'Query', listMyPaymentMethods: { __typename?: 'PaymentMethodConnection', totalEdges: number, edges: Array<{ __typename?: 'PaymentMethodEdge', cursor: string, node: { __typename?: 'PaymentMethod', id: string, methodType: PaymentType, userId: string, isDefault: boolean, details: { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string } } }> } };

export type PaymentManagementStripePaymentMethodDetailFragment = { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string };

export type PaymentManagementPaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, methodType: PaymentType, userId: string, isDefault: boolean, details: { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string } };

export type PaymentManagementListMyPaymentMethodsQueryVariables = Exact<{
  orderBy?: InputMaybe<OrderByInput>;
  start?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type PaymentManagementListMyPaymentMethodsQuery = { __typename?: 'Query', listMyPaymentMethods: { __typename?: 'PaymentMethodConnection', totalEdges: number, edges: Array<{ __typename?: 'PaymentMethodEdge', cursor: string, node: { __typename?: 'PaymentMethod', id: string, methodType: PaymentType, userId: string, isDefault: boolean, details: { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string } } }> } };

export type CreateSetupIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSetupIntentMutation = { __typename?: 'Mutation', createSetupIntent: { __typename?: 'SetupIntent', customer: string, ephemeralKey: string, setupIntent: string } };

export type PaymentManagementRemovePaymentMethodMutationVariables = Exact<{
  input: RemovePaymentMethodInput;
}>;


export type PaymentManagementRemovePaymentMethodMutation = { __typename?: 'Mutation', removePaymentMethod: { __typename?: 'PaymentMethod', id: string, methodType: PaymentType, userId: string, isDefault: boolean, details: { __typename?: 'StripePaymentMethodDetail', brand: StripeCardBrand, fingerprint: string, last4: string, createdAt: number, expMonth: number, expYear: number, paymentMethodId: string, setupIntentId: string } } };

export type CreatePaymentMethodMutationVariables = Exact<{
  input: CreatePaymentMethodInput;
}>;


export type CreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'PaymentMethod', isDefault: boolean, id: string, methodType: PaymentType, userId: string, details: { __typename?: 'StripePaymentMethodDetail', setupIntentId: string, brand: StripeCardBrand } } };

export type AddressFragment = { __typename?: 'Address', id: string, address1: string, address2?: string | null, city: string, country: string, state: string, zip: string };

export type AddressManagementCreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type AddressManagementCreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', id: string } };

export type AddressManagementListMyAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressManagementListMyAddressesQuery = { __typename?: 'Query', listMyAddresses?: Array<{ __typename?: 'Address', id: string, address1: string, address2?: string | null, city: string, country: string, state: string, zip: string }> | null };

export type AddressManagementGetAddressQueryVariables = Exact<{
  getAddressId: Scalars['ID'];
}>;


export type AddressManagementGetAddressQuery = { __typename?: 'Query', getAddress?: { __typename?: 'Address', id: string, address1: string, address2?: string | null, city: string, country: string, state: string, zip: string } | null };

export type AddressManagementUpdateAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
}>;


export type AddressManagementUpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', id: string, address1: string, address2?: string | null, city: string, country: string, state: string, zip: string } };

export type AddressManagementRemoveAddressMutationVariables = Exact<{
  input: RemoveAddressInput;
}>;


export type AddressManagementRemoveAddressMutation = { __typename?: 'Mutation', removeAddress: { __typename?: 'Address', id: string, address1: string, address2?: string | null, city: string, country: string, state: string, zip: string } };

export type AuthCognitoGroupFragment = { __typename?: 'CognitoGroup', GroupName: string };

export type AuthAuthenticationResultFragment = { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string };

export type AuthConfirmSignInResultFragment = { __typename?: 'ConfirmSignInResult', message: string, data: { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string } };

export type AuthUserFragment = { __typename?: 'User', id: string, phoneNumber?: string | null, cognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string }> };

export type AuthSignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type AuthSignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'ConfirmSignInResult', message: string, data: { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string } } | { __typename?: 'Message', message: string } | { __typename?: 'SignInResult', data: { __typename?: 'ChallengeResult', Session: string } } };

export type AuthResendVerifyIdentifierMutationVariables = Exact<{
  input: ResendOtpInput;
}>;


export type AuthResendVerifyIdentifierMutation = { __typename?: 'Mutation', resendOTP: { __typename?: 'SignInResult', data: { __typename?: 'ChallengeResult', Session: string } } };

export type AuthConfirmSignInMutationVariables = Exact<{
  input: ConfirmSignInInput;
}>;


export type AuthConfirmSignInMutation = { __typename?: 'Mutation', confirmSignIn: { __typename?: 'ConfirmSignInResult', message: string, data: { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string } } | { __typename?: 'Message', message: string } | { __typename?: 'SignInResult', message: string, data: { __typename?: 'ChallengeResult', Session: string } } };

export type AuthSignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthSignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'Message', message: string } };

export type AuthRefreshTokenMutationVariables = Exact<{
  refreshTokenInput: RefreshTokenInput;
}>;


export type AuthRefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'ConfirmSignInResult', message: string, data: { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string } } };

export type AuthMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthMeQuery = { __typename?: 'Query', me: { __typename?: 'User', email: string, firstName: string, group?: Group | null, id: string, lastName: string, locale: string, middleName?: string | null, username?: string | null, isRegisteredBidder: boolean, consignor?: { __typename?: 'Consignor', secondaryEmail?: string | null, phone?: string | null } | null } };

export type AuthSignupMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type AuthSignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'ConfirmSignInResult', message: string, data: { __typename?: 'AuthenticationResult', AccessToken: string, ExpiresIn: number, IdToken: string, RefreshToken?: string | null, TokenType: string } } };

export type AuthCompleteAccountMutationVariables = Exact<{
  input: CompleteAccountInput;
}>;


export type AuthCompleteAccountMutation = { __typename?: 'Mutation', completeAccount: { __typename?: 'Message', message: string } };

export type UserManagementCognitoUserAttributeFragment = { __typename?: 'CognitoUserAttribute', Name: string, Value: string };

export type UserManagementCognitoUserFragment = { __typename?: 'CognitoUser', Username: string, Enabled: boolean, UserStatus: CognitoUserStatus, UserAttributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null, Attributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null };

export type UserManagementCognitoGroupFragment = { __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null };

export type UserManagementUserFragment = { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any };

export type UserManagementDetailUserFragment = { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any, cognitoUser: { __typename?: 'CognitoUser', Username: string, Enabled: boolean, UserStatus: CognitoUserStatus, UserAttributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null, Attributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null }, cognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null }> };

export type UserManagementUserEdgeFragment = { __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any } };

export type UserManagementUserConnectionFragment = { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } };

export type UserManagementGetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserManagementGetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any, cognitoUser: { __typename?: 'CognitoUser', Username: string, Enabled: boolean, UserStatus: CognitoUserStatus, UserAttributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null, Attributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null }, cognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null }> } };

export type UserManagementListCognitoGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserManagementListCognitoGroupsQuery = { __typename?: 'Query', listCognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null }> };

export type UserManagementAddUserToCognitoGroupMutationVariables = Exact<{
  input: ModifyUserCognitoGroupsInput;
}>;


export type UserManagementAddUserToCognitoGroupMutation = { __typename?: 'Mutation', addUserToCognitoGroup: { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any, cognitoUser: { __typename?: 'CognitoUser', Username: string, Enabled: boolean, UserStatus: CognitoUserStatus, UserAttributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null, Attributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null }, cognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null }> } };

export type UserManagementRemoveUserFromCognitoGroupMutationVariables = Exact<{
  input: ModifyUserCognitoGroupsInput;
}>;


export type UserManagementRemoveUserFromCognitoGroupMutation = { __typename?: 'Mutation', removeUserFromCognitoGroup: { __typename?: 'User', id: string, phoneNumber?: string | null, createdAt: any, updatedAt: any, cognitoUser: { __typename?: 'CognitoUser', Username: string, Enabled: boolean, UserStatus: CognitoUserStatus, UserAttributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null, Attributes?: Array<{ __typename?: 'CognitoUserAttribute', Name: string, Value: string }> | null }, cognitoGroups: Array<{ __typename?: 'CognitoGroup', GroupName: string, UserPoolId: string, Description?: string | null, RoleArn?: string | null, Precedence?: number | null, LastModifiedDate?: any | null, CreationDate?: any | null }> } };

export const PayoutMethodDetailFragmentDoc = gql`
    fragment PayoutMethodDetail on PayoutMethodDetail {
  email
  bankName
  accountNumber
  accountType
  routingNumber
  bankAddress
}
    `;
export const PayoutMethodInfoFragmentDoc = gql`
    fragment PayoutMethodInfo on PayoutMethod {
  type
  detail {
    ...PayoutMethodDetail
  }
  id
}
    ${PayoutMethodDetailFragmentDoc}`;
export const AccountManagementStripePaymentMethodDetailFragmentDoc = gql`
    fragment AccountManagementStripePaymentMethodDetail on StripePaymentMethodDetail {
  brand
  fingerprint
  last4
  createdAt
  expMonth
  expYear
  paymentMethodId
  setupIntentId
}
    `;
export const AccountManagementPaymentMethodFragmentDoc = gql`
    fragment AccountManagementPaymentMethod on PaymentMethod {
  id
  methodType
  userId
  isDefault
  details {
    ...AccountManagementStripePaymentMethodDetail
  }
}
    ${AccountManagementStripePaymentMethodDetailFragmentDoc}`;
export const PaymentManagementStripePaymentMethodDetailFragmentDoc = gql`
    fragment PaymentManagementStripePaymentMethodDetail on StripePaymentMethodDetail {
  brand
  fingerprint
  last4
  createdAt
  expMonth
  expYear
  paymentMethodId
  setupIntentId
}
    `;
export const PaymentManagementPaymentMethodFragmentDoc = gql`
    fragment PaymentManagementPaymentMethod on PaymentMethod {
  id
  methodType
  userId
  isDefault
  details {
    ...PaymentManagementStripePaymentMethodDetail
  }
}
    ${PaymentManagementStripePaymentMethodDetailFragmentDoc}`;
export const AddressFragmentDoc = gql`
    fragment Address on Address {
  id
  address1
  address2
  city
  country
  state
  zip
}
    `;
export const AuthAuthenticationResultFragmentDoc = gql`
    fragment AuthAuthenticationResult on AuthenticationResult {
  AccessToken
  ExpiresIn
  IdToken
  RefreshToken
  TokenType
}
    `;
export const AuthConfirmSignInResultFragmentDoc = gql`
    fragment AuthConfirmSignInResult on ConfirmSignInResult {
  data {
    ...AuthAuthenticationResult
  }
  message
}
    ${AuthAuthenticationResultFragmentDoc}`;
export const AuthCognitoGroupFragmentDoc = gql`
    fragment AuthCognitoGroup on CognitoGroup {
  GroupName
}
    `;
export const AuthUserFragmentDoc = gql`
    fragment AuthUser on User {
  id
  phoneNumber
  cognitoGroups {
    ...AuthCognitoGroup
  }
}
    ${AuthCognitoGroupFragmentDoc}`;
export const UserManagementUserFragmentDoc = gql`
    fragment UserManagementUser on User {
  id
  phoneNumber
  createdAt
  updatedAt
}
    `;
export const UserManagementCognitoUserAttributeFragmentDoc = gql`
    fragment UserManagementCognitoUserAttribute on CognitoUserAttribute {
  Name
  Value
}
    `;
export const UserManagementCognitoUserFragmentDoc = gql`
    fragment UserManagementCognitoUser on CognitoUser {
  Username
  Enabled
  UserStatus
  UserAttributes {
    ...UserManagementCognitoUserAttribute
  }
  Attributes {
    ...UserManagementCognitoUserAttribute
  }
}
    ${UserManagementCognitoUserAttributeFragmentDoc}`;
export const UserManagementCognitoGroupFragmentDoc = gql`
    fragment UserManagementCognitoGroup on CognitoGroup {
  GroupName
  UserPoolId
  Description
  RoleArn
  Precedence
  LastModifiedDate
  CreationDate
}
    `;
export const UserManagementDetailUserFragmentDoc = gql`
    fragment UserManagementDetailUser on User {
  ...UserManagementUser
  cognitoUser {
    ...UserManagementCognitoUser
  }
  cognitoGroups {
    ...UserManagementCognitoGroup
  }
}
    ${UserManagementUserFragmentDoc}
${UserManagementCognitoUserFragmentDoc}
${UserManagementCognitoGroupFragmentDoc}`;
export const UserManagementUserEdgeFragmentDoc = gql`
    fragment UserManagementUserEdge on UserEdge {
  cursor
  node {
    ...UserManagementUser
  }
}
    ${UserManagementUserFragmentDoc}`;
export const UserManagementUserConnectionFragmentDoc = gql`
    fragment UserManagementUserConnection on UserConnection {
  edges {
    ...UserManagementUserEdge
  }
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
}
    ${UserManagementUserEdgeFragmentDoc}`;
export const AccountManagementUpdateMeDocument = gql`
    mutation AccountManagementUpdateMe($input: UpdateMeInput!) {
  updateMe(input: $input) {
    lastName
    firstName
    group
    consignor {
      secondaryEmail
      phone
    }
  }
}
    `;
export type AccountManagementUpdateMeMutationFn = Apollo.MutationFunction<AccountManagementUpdateMeMutation, AccountManagementUpdateMeMutationVariables>;

/**
 * __useAccountManagementUpdateMeMutation__
 *
 * To run a mutation, you first call `useAccountManagementUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountManagementUpdateMeMutation, { data, loading, error }] = useAccountManagementUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountManagementUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<AccountManagementUpdateMeMutation, AccountManagementUpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountManagementUpdateMeMutation, AccountManagementUpdateMeMutationVariables>(AccountManagementUpdateMeDocument, options);
      }
export type AccountManagementUpdateMeMutationHookResult = ReturnType<typeof useAccountManagementUpdateMeMutation>;
export type AccountManagementUpdateMeMutationResult = Apollo.MutationResult<AccountManagementUpdateMeMutation>;
export type AccountManagementUpdateMeMutationOptions = Apollo.BaseMutationOptions<AccountManagementUpdateMeMutation, AccountManagementUpdateMeMutationVariables>;
export const AccountManagementListMyPayoutMethodsDocument = gql`
    query AccountManagementListMyPayoutMethods($limit: Int, $start: Int, $orderBy: OrderByInput) {
  listMyPayoutMethods(limit: $limit, start: $start, orderBy: $orderBy) {
    edges {
      node {
        ...PayoutMethodInfo
      }
    }
  }
}
    ${PayoutMethodInfoFragmentDoc}`;

/**
 * __useAccountManagementListMyPayoutMethodsQuery__
 *
 * To run a query within a React component, call `useAccountManagementListMyPayoutMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementListMyPayoutMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountManagementListMyPayoutMethodsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      start: // value for 'start'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useAccountManagementListMyPayoutMethodsQuery(baseOptions?: Apollo.QueryHookOptions<AccountManagementListMyPayoutMethodsQuery, AccountManagementListMyPayoutMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountManagementListMyPayoutMethodsQuery, AccountManagementListMyPayoutMethodsQueryVariables>(AccountManagementListMyPayoutMethodsDocument, options);
      }
export function useAccountManagementListMyPayoutMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountManagementListMyPayoutMethodsQuery, AccountManagementListMyPayoutMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountManagementListMyPayoutMethodsQuery, AccountManagementListMyPayoutMethodsQueryVariables>(AccountManagementListMyPayoutMethodsDocument, options);
        }
export type AccountManagementListMyPayoutMethodsQueryHookResult = ReturnType<typeof useAccountManagementListMyPayoutMethodsQuery>;
export type AccountManagementListMyPayoutMethodsLazyQueryHookResult = ReturnType<typeof useAccountManagementListMyPayoutMethodsLazyQuery>;
export type AccountManagementListMyPayoutMethodsQueryResult = Apollo.QueryResult<AccountManagementListMyPayoutMethodsQuery, AccountManagementListMyPayoutMethodsQueryVariables>;
export const AccountManagementGetPayoutMethodDocument = gql`
    query AccountManagementGetPayoutMethod($getPayoutMethodId: ID!) {
  getPayoutMethod(id: $getPayoutMethodId) {
    ...PayoutMethodInfo
  }
}
    ${PayoutMethodInfoFragmentDoc}`;

/**
 * __useAccountManagementGetPayoutMethodQuery__
 *
 * To run a query within a React component, call `useAccountManagementGetPayoutMethodQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementGetPayoutMethodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountManagementGetPayoutMethodQuery({
 *   variables: {
 *      getPayoutMethodId: // value for 'getPayoutMethodId'
 *   },
 * });
 */
export function useAccountManagementGetPayoutMethodQuery(baseOptions: Apollo.QueryHookOptions<AccountManagementGetPayoutMethodQuery, AccountManagementGetPayoutMethodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountManagementGetPayoutMethodQuery, AccountManagementGetPayoutMethodQueryVariables>(AccountManagementGetPayoutMethodDocument, options);
      }
export function useAccountManagementGetPayoutMethodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountManagementGetPayoutMethodQuery, AccountManagementGetPayoutMethodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountManagementGetPayoutMethodQuery, AccountManagementGetPayoutMethodQueryVariables>(AccountManagementGetPayoutMethodDocument, options);
        }
export type AccountManagementGetPayoutMethodQueryHookResult = ReturnType<typeof useAccountManagementGetPayoutMethodQuery>;
export type AccountManagementGetPayoutMethodLazyQueryHookResult = ReturnType<typeof useAccountManagementGetPayoutMethodLazyQuery>;
export type AccountManagementGetPayoutMethodQueryResult = Apollo.QueryResult<AccountManagementGetPayoutMethodQuery, AccountManagementGetPayoutMethodQueryVariables>;
export const AccountManagementCreatePayoutMethodDocument = gql`
    mutation AccountManagementCreatePayoutMethod($input: CreatePayoutMethodInput!) {
  createPayoutMethod(input: $input) {
    ...PayoutMethodInfo
  }
}
    ${PayoutMethodInfoFragmentDoc}`;
export type AccountManagementCreatePayoutMethodMutationFn = Apollo.MutationFunction<AccountManagementCreatePayoutMethodMutation, AccountManagementCreatePayoutMethodMutationVariables>;

/**
 * __useAccountManagementCreatePayoutMethodMutation__
 *
 * To run a mutation, you first call `useAccountManagementCreatePayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementCreatePayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountManagementCreatePayoutMethodMutation, { data, loading, error }] = useAccountManagementCreatePayoutMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountManagementCreatePayoutMethodMutation(baseOptions?: Apollo.MutationHookOptions<AccountManagementCreatePayoutMethodMutation, AccountManagementCreatePayoutMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountManagementCreatePayoutMethodMutation, AccountManagementCreatePayoutMethodMutationVariables>(AccountManagementCreatePayoutMethodDocument, options);
      }
export type AccountManagementCreatePayoutMethodMutationHookResult = ReturnType<typeof useAccountManagementCreatePayoutMethodMutation>;
export type AccountManagementCreatePayoutMethodMutationResult = Apollo.MutationResult<AccountManagementCreatePayoutMethodMutation>;
export type AccountManagementCreatePayoutMethodMutationOptions = Apollo.BaseMutationOptions<AccountManagementCreatePayoutMethodMutation, AccountManagementCreatePayoutMethodMutationVariables>;
export const AccountManagementUpdatePayoutMethodDocument = gql`
    mutation AccountManagementUpdatePayoutMethod($input: UpdatePayoutMethodInput!) {
  updatePayoutMethod(input: $input) {
    ...PayoutMethodInfo
  }
}
    ${PayoutMethodInfoFragmentDoc}`;
export type AccountManagementUpdatePayoutMethodMutationFn = Apollo.MutationFunction<AccountManagementUpdatePayoutMethodMutation, AccountManagementUpdatePayoutMethodMutationVariables>;

/**
 * __useAccountManagementUpdatePayoutMethodMutation__
 *
 * To run a mutation, you first call `useAccountManagementUpdatePayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementUpdatePayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountManagementUpdatePayoutMethodMutation, { data, loading, error }] = useAccountManagementUpdatePayoutMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountManagementUpdatePayoutMethodMutation(baseOptions?: Apollo.MutationHookOptions<AccountManagementUpdatePayoutMethodMutation, AccountManagementUpdatePayoutMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountManagementUpdatePayoutMethodMutation, AccountManagementUpdatePayoutMethodMutationVariables>(AccountManagementUpdatePayoutMethodDocument, options);
      }
export type AccountManagementUpdatePayoutMethodMutationHookResult = ReturnType<typeof useAccountManagementUpdatePayoutMethodMutation>;
export type AccountManagementUpdatePayoutMethodMutationResult = Apollo.MutationResult<AccountManagementUpdatePayoutMethodMutation>;
export type AccountManagementUpdatePayoutMethodMutationOptions = Apollo.BaseMutationOptions<AccountManagementUpdatePayoutMethodMutation, AccountManagementUpdatePayoutMethodMutationVariables>;
export const AccountManagementRemovePayoutMethodDocument = gql`
    mutation AccountManagementRemovePayoutMethod($input: RemovePayoutMethodInput!) {
  removePayoutMethod(input: $input) {
    ...PayoutMethodInfo
  }
}
    ${PayoutMethodInfoFragmentDoc}`;
export type AccountManagementRemovePayoutMethodMutationFn = Apollo.MutationFunction<AccountManagementRemovePayoutMethodMutation, AccountManagementRemovePayoutMethodMutationVariables>;

/**
 * __useAccountManagementRemovePayoutMethodMutation__
 *
 * To run a mutation, you first call `useAccountManagementRemovePayoutMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementRemovePayoutMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountManagementRemovePayoutMethodMutation, { data, loading, error }] = useAccountManagementRemovePayoutMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAccountManagementRemovePayoutMethodMutation(baseOptions?: Apollo.MutationHookOptions<AccountManagementRemovePayoutMethodMutation, AccountManagementRemovePayoutMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountManagementRemovePayoutMethodMutation, AccountManagementRemovePayoutMethodMutationVariables>(AccountManagementRemovePayoutMethodDocument, options);
      }
export type AccountManagementRemovePayoutMethodMutationHookResult = ReturnType<typeof useAccountManagementRemovePayoutMethodMutation>;
export type AccountManagementRemovePayoutMethodMutationResult = Apollo.MutationResult<AccountManagementRemovePayoutMethodMutation>;
export type AccountManagementRemovePayoutMethodMutationOptions = Apollo.BaseMutationOptions<AccountManagementRemovePayoutMethodMutation, AccountManagementRemovePayoutMethodMutationVariables>;
export const AccountManagementListMyPaymentMethodsDocument = gql`
    query AccountManagementListMyPaymentMethods($orderBy: OrderByInput, $start: Int, $limit: Int) {
  listMyPaymentMethods(orderBy: $orderBy, start: $start, limit: $limit) {
    edges {
      cursor
      node {
        ...AccountManagementPaymentMethod
      }
    }
    totalEdges
  }
}
    ${AccountManagementPaymentMethodFragmentDoc}`;

/**
 * __useAccountManagementListMyPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useAccountManagementListMyPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountManagementListMyPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountManagementListMyPaymentMethodsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      start: // value for 'start'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAccountManagementListMyPaymentMethodsQuery(baseOptions?: Apollo.QueryHookOptions<AccountManagementListMyPaymentMethodsQuery, AccountManagementListMyPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountManagementListMyPaymentMethodsQuery, AccountManagementListMyPaymentMethodsQueryVariables>(AccountManagementListMyPaymentMethodsDocument, options);
      }
export function useAccountManagementListMyPaymentMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountManagementListMyPaymentMethodsQuery, AccountManagementListMyPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountManagementListMyPaymentMethodsQuery, AccountManagementListMyPaymentMethodsQueryVariables>(AccountManagementListMyPaymentMethodsDocument, options);
        }
export type AccountManagementListMyPaymentMethodsQueryHookResult = ReturnType<typeof useAccountManagementListMyPaymentMethodsQuery>;
export type AccountManagementListMyPaymentMethodsLazyQueryHookResult = ReturnType<typeof useAccountManagementListMyPaymentMethodsLazyQuery>;
export type AccountManagementListMyPaymentMethodsQueryResult = Apollo.QueryResult<AccountManagementListMyPaymentMethodsQuery, AccountManagementListMyPaymentMethodsQueryVariables>;
export const PaymentManagementListMyPaymentMethodsDocument = gql`
    query PaymentManagementListMyPaymentMethods($orderBy: OrderByInput, $start: Int, $limit: Int) {
  listMyPaymentMethods(orderBy: $orderBy, start: $start, limit: $limit) {
    edges {
      cursor
      node {
        ...PaymentManagementPaymentMethod
      }
    }
    totalEdges
  }
}
    ${PaymentManagementPaymentMethodFragmentDoc}`;

/**
 * __usePaymentManagementListMyPaymentMethodsQuery__
 *
 * To run a query within a React component, call `usePaymentManagementListMyPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentManagementListMyPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentManagementListMyPaymentMethodsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      start: // value for 'start'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePaymentManagementListMyPaymentMethodsQuery(baseOptions?: Apollo.QueryHookOptions<PaymentManagementListMyPaymentMethodsQuery, PaymentManagementListMyPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentManagementListMyPaymentMethodsQuery, PaymentManagementListMyPaymentMethodsQueryVariables>(PaymentManagementListMyPaymentMethodsDocument, options);
      }
export function usePaymentManagementListMyPaymentMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentManagementListMyPaymentMethodsQuery, PaymentManagementListMyPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentManagementListMyPaymentMethodsQuery, PaymentManagementListMyPaymentMethodsQueryVariables>(PaymentManagementListMyPaymentMethodsDocument, options);
        }
export type PaymentManagementListMyPaymentMethodsQueryHookResult = ReturnType<typeof usePaymentManagementListMyPaymentMethodsQuery>;
export type PaymentManagementListMyPaymentMethodsLazyQueryHookResult = ReturnType<typeof usePaymentManagementListMyPaymentMethodsLazyQuery>;
export type PaymentManagementListMyPaymentMethodsQueryResult = Apollo.QueryResult<PaymentManagementListMyPaymentMethodsQuery, PaymentManagementListMyPaymentMethodsQueryVariables>;
export const CreateSetupIntentDocument = gql`
    mutation CreateSetupIntent {
  createSetupIntent {
    customer
    ephemeralKey
    setupIntent
  }
}
    `;
export type CreateSetupIntentMutationFn = Apollo.MutationFunction<CreateSetupIntentMutation, CreateSetupIntentMutationVariables>;

/**
 * __useCreateSetupIntentMutation__
 *
 * To run a mutation, you first call `useCreateSetupIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetupIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetupIntentMutation, { data, loading, error }] = useCreateSetupIntentMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateSetupIntentMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetupIntentMutation, CreateSetupIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetupIntentMutation, CreateSetupIntentMutationVariables>(CreateSetupIntentDocument, options);
      }
export type CreateSetupIntentMutationHookResult = ReturnType<typeof useCreateSetupIntentMutation>;
export type CreateSetupIntentMutationResult = Apollo.MutationResult<CreateSetupIntentMutation>;
export type CreateSetupIntentMutationOptions = Apollo.BaseMutationOptions<CreateSetupIntentMutation, CreateSetupIntentMutationVariables>;
export const PaymentManagementRemovePaymentMethodDocument = gql`
    mutation PaymentManagementRemovePaymentMethod($input: RemovePaymentMethodInput!) {
  removePaymentMethod(input: $input) {
    ...PaymentManagementPaymentMethod
  }
}
    ${PaymentManagementPaymentMethodFragmentDoc}`;
export type PaymentManagementRemovePaymentMethodMutationFn = Apollo.MutationFunction<PaymentManagementRemovePaymentMethodMutation, PaymentManagementRemovePaymentMethodMutationVariables>;

/**
 * __usePaymentManagementRemovePaymentMethodMutation__
 *
 * To run a mutation, you first call `usePaymentManagementRemovePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentManagementRemovePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentManagementRemovePaymentMethodMutation, { data, loading, error }] = usePaymentManagementRemovePaymentMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentManagementRemovePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<PaymentManagementRemovePaymentMethodMutation, PaymentManagementRemovePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentManagementRemovePaymentMethodMutation, PaymentManagementRemovePaymentMethodMutationVariables>(PaymentManagementRemovePaymentMethodDocument, options);
      }
export type PaymentManagementRemovePaymentMethodMutationHookResult = ReturnType<typeof usePaymentManagementRemovePaymentMethodMutation>;
export type PaymentManagementRemovePaymentMethodMutationResult = Apollo.MutationResult<PaymentManagementRemovePaymentMethodMutation>;
export type PaymentManagementRemovePaymentMethodMutationOptions = Apollo.BaseMutationOptions<PaymentManagementRemovePaymentMethodMutation, PaymentManagementRemovePaymentMethodMutationVariables>;
export const CreatePaymentMethodDocument = gql`
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
  createPaymentMethod(input: $input) {
    isDefault
    id
    methodType
    userId
    details {
      setupIntentId
      brand
    }
  }
}
    `;
export type CreatePaymentMethodMutationFn = Apollo.MutationFunction<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;

/**
 * __useCreatePaymentMethodMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMethodMutation, { data, loading, error }] = useCreatePaymentMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMethodMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>(CreatePaymentMethodDocument, options);
      }
export type CreatePaymentMethodMutationHookResult = ReturnType<typeof useCreatePaymentMethodMutation>;
export type CreatePaymentMethodMutationResult = Apollo.MutationResult<CreatePaymentMethodMutation>;
export type CreatePaymentMethodMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>;
export const AddressManagementCreateAddressDocument = gql`
    mutation AddressManagementCreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    id
  }
}
    `;
export type AddressManagementCreateAddressMutationFn = Apollo.MutationFunction<AddressManagementCreateAddressMutation, AddressManagementCreateAddressMutationVariables>;

/**
 * __useAddressManagementCreateAddressMutation__
 *
 * To run a mutation, you first call `useAddressManagementCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddressManagementCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addressManagementCreateAddressMutation, { data, loading, error }] = useAddressManagementCreateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddressManagementCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddressManagementCreateAddressMutation, AddressManagementCreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddressManagementCreateAddressMutation, AddressManagementCreateAddressMutationVariables>(AddressManagementCreateAddressDocument, options);
      }
export type AddressManagementCreateAddressMutationHookResult = ReturnType<typeof useAddressManagementCreateAddressMutation>;
export type AddressManagementCreateAddressMutationResult = Apollo.MutationResult<AddressManagementCreateAddressMutation>;
export type AddressManagementCreateAddressMutationOptions = Apollo.BaseMutationOptions<AddressManagementCreateAddressMutation, AddressManagementCreateAddressMutationVariables>;
export const AddressManagementListMyAddressesDocument = gql`
    query AddressManagementListMyAddresses {
  listMyAddresses {
    ...Address
  }
}
    ${AddressFragmentDoc}`;

/**
 * __useAddressManagementListMyAddressesQuery__
 *
 * To run a query within a React component, call `useAddressManagementListMyAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressManagementListMyAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressManagementListMyAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressManagementListMyAddressesQuery(baseOptions?: Apollo.QueryHookOptions<AddressManagementListMyAddressesQuery, AddressManagementListMyAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressManagementListMyAddressesQuery, AddressManagementListMyAddressesQueryVariables>(AddressManagementListMyAddressesDocument, options);
      }
export function useAddressManagementListMyAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressManagementListMyAddressesQuery, AddressManagementListMyAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressManagementListMyAddressesQuery, AddressManagementListMyAddressesQueryVariables>(AddressManagementListMyAddressesDocument, options);
        }
export type AddressManagementListMyAddressesQueryHookResult = ReturnType<typeof useAddressManagementListMyAddressesQuery>;
export type AddressManagementListMyAddressesLazyQueryHookResult = ReturnType<typeof useAddressManagementListMyAddressesLazyQuery>;
export type AddressManagementListMyAddressesQueryResult = Apollo.QueryResult<AddressManagementListMyAddressesQuery, AddressManagementListMyAddressesQueryVariables>;
export const AddressManagementGetAddressDocument = gql`
    query AddressManagementGetAddress($getAddressId: ID!) {
  getAddress(id: $getAddressId) {
    ...Address
  }
}
    ${AddressFragmentDoc}`;

/**
 * __useAddressManagementGetAddressQuery__
 *
 * To run a query within a React component, call `useAddressManagementGetAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressManagementGetAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressManagementGetAddressQuery({
 *   variables: {
 *      getAddressId: // value for 'getAddressId'
 *   },
 * });
 */
export function useAddressManagementGetAddressQuery(baseOptions: Apollo.QueryHookOptions<AddressManagementGetAddressQuery, AddressManagementGetAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressManagementGetAddressQuery, AddressManagementGetAddressQueryVariables>(AddressManagementGetAddressDocument, options);
      }
export function useAddressManagementGetAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressManagementGetAddressQuery, AddressManagementGetAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressManagementGetAddressQuery, AddressManagementGetAddressQueryVariables>(AddressManagementGetAddressDocument, options);
        }
export type AddressManagementGetAddressQueryHookResult = ReturnType<typeof useAddressManagementGetAddressQuery>;
export type AddressManagementGetAddressLazyQueryHookResult = ReturnType<typeof useAddressManagementGetAddressLazyQuery>;
export type AddressManagementGetAddressQueryResult = Apollo.QueryResult<AddressManagementGetAddressQuery, AddressManagementGetAddressQueryVariables>;
export const AddressManagementUpdateAddressDocument = gql`
    mutation AddressManagementUpdateAddress($input: UpdateAddressInput!) {
  updateAddress(input: $input) {
    ...Address
  }
}
    ${AddressFragmentDoc}`;
export type AddressManagementUpdateAddressMutationFn = Apollo.MutationFunction<AddressManagementUpdateAddressMutation, AddressManagementUpdateAddressMutationVariables>;

/**
 * __useAddressManagementUpdateAddressMutation__
 *
 * To run a mutation, you first call `useAddressManagementUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddressManagementUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addressManagementUpdateAddressMutation, { data, loading, error }] = useAddressManagementUpdateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddressManagementUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddressManagementUpdateAddressMutation, AddressManagementUpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddressManagementUpdateAddressMutation, AddressManagementUpdateAddressMutationVariables>(AddressManagementUpdateAddressDocument, options);
      }
export type AddressManagementUpdateAddressMutationHookResult = ReturnType<typeof useAddressManagementUpdateAddressMutation>;
export type AddressManagementUpdateAddressMutationResult = Apollo.MutationResult<AddressManagementUpdateAddressMutation>;
export type AddressManagementUpdateAddressMutationOptions = Apollo.BaseMutationOptions<AddressManagementUpdateAddressMutation, AddressManagementUpdateAddressMutationVariables>;
export const AddressManagementRemoveAddressDocument = gql`
    mutation AddressManagementRemoveAddress($input: RemoveAddressInput!) {
  removeAddress(input: $input) {
    ...Address
  }
}
    ${AddressFragmentDoc}`;
export type AddressManagementRemoveAddressMutationFn = Apollo.MutationFunction<AddressManagementRemoveAddressMutation, AddressManagementRemoveAddressMutationVariables>;

/**
 * __useAddressManagementRemoveAddressMutation__
 *
 * To run a mutation, you first call `useAddressManagementRemoveAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddressManagementRemoveAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addressManagementRemoveAddressMutation, { data, loading, error }] = useAddressManagementRemoveAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddressManagementRemoveAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddressManagementRemoveAddressMutation, AddressManagementRemoveAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddressManagementRemoveAddressMutation, AddressManagementRemoveAddressMutationVariables>(AddressManagementRemoveAddressDocument, options);
      }
export type AddressManagementRemoveAddressMutationHookResult = ReturnType<typeof useAddressManagementRemoveAddressMutation>;
export type AddressManagementRemoveAddressMutationResult = Apollo.MutationResult<AddressManagementRemoveAddressMutation>;
export type AddressManagementRemoveAddressMutationOptions = Apollo.BaseMutationOptions<AddressManagementRemoveAddressMutation, AddressManagementRemoveAddressMutationVariables>;
export const AuthSignInDocument = gql`
    mutation AuthSignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    ... on ConfirmSignInResult {
      data {
        ...AuthAuthenticationResult
      }
      message
    }
    ... on SignInResult {
      data {
        Session
      }
    }
    ... on Message {
      message
    }
  }
}
    ${AuthAuthenticationResultFragmentDoc}`;
export type AuthSignInMutationFn = Apollo.MutationFunction<AuthSignInMutation, AuthSignInMutationVariables>;

/**
 * __useAuthSignInMutation__
 *
 * To run a mutation, you first call `useAuthSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignInMutation, { data, loading, error }] = useAuthSignInMutation({
 *   variables: {
 *      signInInput: // value for 'signInInput'
 *   },
 * });
 */
export function useAuthSignInMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignInMutation, AuthSignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignInMutation, AuthSignInMutationVariables>(AuthSignInDocument, options);
      }
export type AuthSignInMutationHookResult = ReturnType<typeof useAuthSignInMutation>;
export type AuthSignInMutationResult = Apollo.MutationResult<AuthSignInMutation>;
export type AuthSignInMutationOptions = Apollo.BaseMutationOptions<AuthSignInMutation, AuthSignInMutationVariables>;
export const AuthResendVerifyIdentifierDocument = gql`
    mutation AuthResendVerifyIdentifier($input: ResendOtpInput!) {
  resendOTP(resendOtpInput: $input) {
    data {
      Session
    }
  }
}
    `;
export type AuthResendVerifyIdentifierMutationFn = Apollo.MutationFunction<AuthResendVerifyIdentifierMutation, AuthResendVerifyIdentifierMutationVariables>;

/**
 * __useAuthResendVerifyIdentifierMutation__
 *
 * To run a mutation, you first call `useAuthResendVerifyIdentifierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthResendVerifyIdentifierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authResendVerifyIdentifierMutation, { data, loading, error }] = useAuthResendVerifyIdentifierMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthResendVerifyIdentifierMutation(baseOptions?: Apollo.MutationHookOptions<AuthResendVerifyIdentifierMutation, AuthResendVerifyIdentifierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthResendVerifyIdentifierMutation, AuthResendVerifyIdentifierMutationVariables>(AuthResendVerifyIdentifierDocument, options);
      }
export type AuthResendVerifyIdentifierMutationHookResult = ReturnType<typeof useAuthResendVerifyIdentifierMutation>;
export type AuthResendVerifyIdentifierMutationResult = Apollo.MutationResult<AuthResendVerifyIdentifierMutation>;
export type AuthResendVerifyIdentifierMutationOptions = Apollo.BaseMutationOptions<AuthResendVerifyIdentifierMutation, AuthResendVerifyIdentifierMutationVariables>;
export const AuthConfirmSignInDocument = gql`
    mutation AuthConfirmSignIn($input: ConfirmSignInInput!) {
  confirmSignIn(confirmSignInInput: $input) {
    ... on ConfirmSignInResult {
      ...AuthConfirmSignInResult
    }
    ... on SignInResult {
      message
      data {
        Session
      }
    }
    ... on Message {
      message
    }
  }
}
    ${AuthConfirmSignInResultFragmentDoc}`;
export type AuthConfirmSignInMutationFn = Apollo.MutationFunction<AuthConfirmSignInMutation, AuthConfirmSignInMutationVariables>;

/**
 * __useAuthConfirmSignInMutation__
 *
 * To run a mutation, you first call `useAuthConfirmSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthConfirmSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authConfirmSignInMutation, { data, loading, error }] = useAuthConfirmSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthConfirmSignInMutation(baseOptions?: Apollo.MutationHookOptions<AuthConfirmSignInMutation, AuthConfirmSignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthConfirmSignInMutation, AuthConfirmSignInMutationVariables>(AuthConfirmSignInDocument, options);
      }
export type AuthConfirmSignInMutationHookResult = ReturnType<typeof useAuthConfirmSignInMutation>;
export type AuthConfirmSignInMutationResult = Apollo.MutationResult<AuthConfirmSignInMutation>;
export type AuthConfirmSignInMutationOptions = Apollo.BaseMutationOptions<AuthConfirmSignInMutation, AuthConfirmSignInMutationVariables>;
export const AuthSignOutDocument = gql`
    mutation AuthSignOut {
  signOut {
    message
  }
}
    `;
export type AuthSignOutMutationFn = Apollo.MutationFunction<AuthSignOutMutation, AuthSignOutMutationVariables>;

/**
 * __useAuthSignOutMutation__
 *
 * To run a mutation, you first call `useAuthSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignOutMutation, { data, loading, error }] = useAuthSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthSignOutMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignOutMutation, AuthSignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignOutMutation, AuthSignOutMutationVariables>(AuthSignOutDocument, options);
      }
export type AuthSignOutMutationHookResult = ReturnType<typeof useAuthSignOutMutation>;
export type AuthSignOutMutationResult = Apollo.MutationResult<AuthSignOutMutation>;
export type AuthSignOutMutationOptions = Apollo.BaseMutationOptions<AuthSignOutMutation, AuthSignOutMutationVariables>;
export const AuthRefreshTokenDocument = gql`
    mutation AuthRefreshToken($refreshTokenInput: RefreshTokenInput!) {
  refreshToken(refreshTokenInput: $refreshTokenInput) {
    data {
      ...AuthAuthenticationResult
    }
    message
  }
}
    ${AuthAuthenticationResultFragmentDoc}`;
export type AuthRefreshTokenMutationFn = Apollo.MutationFunction<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>;

/**
 * __useAuthRefreshTokenMutation__
 *
 * To run a mutation, you first call `useAuthRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRefreshTokenMutation, { data, loading, error }] = useAuthRefreshTokenMutation({
 *   variables: {
 *      refreshTokenInput: // value for 'refreshTokenInput'
 *   },
 * });
 */
export function useAuthRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>(AuthRefreshTokenDocument, options);
      }
export type AuthRefreshTokenMutationHookResult = ReturnType<typeof useAuthRefreshTokenMutation>;
export type AuthRefreshTokenMutationResult = Apollo.MutationResult<AuthRefreshTokenMutation>;
export type AuthRefreshTokenMutationOptions = Apollo.BaseMutationOptions<AuthRefreshTokenMutation, AuthRefreshTokenMutationVariables>;
export const AuthMeDocument = gql`
    query AuthMe {
  me {
    email
    firstName
    group
    id
    lastName
    locale
    middleName
    username
    consignor {
      secondaryEmail
      phone
    }
    isRegisteredBidder
  }
}
    `;

/**
 * __useAuthMeQuery__
 *
 * To run a query within a React component, call `useAuthMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthMeQuery(baseOptions?: Apollo.QueryHookOptions<AuthMeQuery, AuthMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthMeQuery, AuthMeQueryVariables>(AuthMeDocument, options);
      }
export function useAuthMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthMeQuery, AuthMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthMeQuery, AuthMeQueryVariables>(AuthMeDocument, options);
        }
export type AuthMeQueryHookResult = ReturnType<typeof useAuthMeQuery>;
export type AuthMeLazyQueryHookResult = ReturnType<typeof useAuthMeLazyQuery>;
export type AuthMeQueryResult = Apollo.QueryResult<AuthMeQuery, AuthMeQueryVariables>;
export const AuthSignupDocument = gql`
    mutation AuthSignup($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    data {
      ...AuthAuthenticationResult
    }
    message
  }
}
    ${AuthAuthenticationResultFragmentDoc}`;
export type AuthSignupMutationFn = Apollo.MutationFunction<AuthSignupMutation, AuthSignupMutationVariables>;

/**
 * __useAuthSignupMutation__
 *
 * To run a mutation, you first call `useAuthSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignupMutation, { data, loading, error }] = useAuthSignupMutation({
 *   variables: {
 *      signUpInput: // value for 'signUpInput'
 *   },
 * });
 */
export function useAuthSignupMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignupMutation, AuthSignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignupMutation, AuthSignupMutationVariables>(AuthSignupDocument, options);
      }
export type AuthSignupMutationHookResult = ReturnType<typeof useAuthSignupMutation>;
export type AuthSignupMutationResult = Apollo.MutationResult<AuthSignupMutation>;
export type AuthSignupMutationOptions = Apollo.BaseMutationOptions<AuthSignupMutation, AuthSignupMutationVariables>;
export const AuthCompleteAccountDocument = gql`
    mutation AuthCompleteAccount($input: CompleteAccountInput!) {
  completeAccount(input: $input) {
    message
  }
}
    `;
export type AuthCompleteAccountMutationFn = Apollo.MutationFunction<AuthCompleteAccountMutation, AuthCompleteAccountMutationVariables>;

/**
 * __useAuthCompleteAccountMutation__
 *
 * To run a mutation, you first call `useAuthCompleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthCompleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authCompleteAccountMutation, { data, loading, error }] = useAuthCompleteAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthCompleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<AuthCompleteAccountMutation, AuthCompleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthCompleteAccountMutation, AuthCompleteAccountMutationVariables>(AuthCompleteAccountDocument, options);
      }
export type AuthCompleteAccountMutationHookResult = ReturnType<typeof useAuthCompleteAccountMutation>;
export type AuthCompleteAccountMutationResult = Apollo.MutationResult<AuthCompleteAccountMutation>;
export type AuthCompleteAccountMutationOptions = Apollo.BaseMutationOptions<AuthCompleteAccountMutation, AuthCompleteAccountMutationVariables>;
export const UserManagementGetUserDocument = gql`
    query UserManagementGetUser($id: ID!) {
  getUser(id: $id) {
    ...UserManagementDetailUser
  }
}
    ${UserManagementDetailUserFragmentDoc}`;

/**
 * __useUserManagementGetUserQuery__
 *
 * To run a query within a React component, call `useUserManagementGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserManagementGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserManagementGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserManagementGetUserQuery(baseOptions: Apollo.QueryHookOptions<UserManagementGetUserQuery, UserManagementGetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserManagementGetUserQuery, UserManagementGetUserQueryVariables>(UserManagementGetUserDocument, options);
      }
export function useUserManagementGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserManagementGetUserQuery, UserManagementGetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserManagementGetUserQuery, UserManagementGetUserQueryVariables>(UserManagementGetUserDocument, options);
        }
export type UserManagementGetUserQueryHookResult = ReturnType<typeof useUserManagementGetUserQuery>;
export type UserManagementGetUserLazyQueryHookResult = ReturnType<typeof useUserManagementGetUserLazyQuery>;
export type UserManagementGetUserQueryResult = Apollo.QueryResult<UserManagementGetUserQuery, UserManagementGetUserQueryVariables>;
export const UserManagementListCognitoGroupsDocument = gql`
    query UserManagementListCognitoGroups {
  listCognitoGroups {
    ...UserManagementCognitoGroup
  }
}
    ${UserManagementCognitoGroupFragmentDoc}`;

/**
 * __useUserManagementListCognitoGroupsQuery__
 *
 * To run a query within a React component, call `useUserManagementListCognitoGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserManagementListCognitoGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserManagementListCognitoGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserManagementListCognitoGroupsQuery(baseOptions?: Apollo.QueryHookOptions<UserManagementListCognitoGroupsQuery, UserManagementListCognitoGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserManagementListCognitoGroupsQuery, UserManagementListCognitoGroupsQueryVariables>(UserManagementListCognitoGroupsDocument, options);
      }
export function useUserManagementListCognitoGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserManagementListCognitoGroupsQuery, UserManagementListCognitoGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserManagementListCognitoGroupsQuery, UserManagementListCognitoGroupsQueryVariables>(UserManagementListCognitoGroupsDocument, options);
        }
export type UserManagementListCognitoGroupsQueryHookResult = ReturnType<typeof useUserManagementListCognitoGroupsQuery>;
export type UserManagementListCognitoGroupsLazyQueryHookResult = ReturnType<typeof useUserManagementListCognitoGroupsLazyQuery>;
export type UserManagementListCognitoGroupsQueryResult = Apollo.QueryResult<UserManagementListCognitoGroupsQuery, UserManagementListCognitoGroupsQueryVariables>;
export const UserManagementAddUserToCognitoGroupDocument = gql`
    mutation UserManagementAddUserToCognitoGroup($input: ModifyUserCognitoGroupsInput!) {
  addUserToCognitoGroup(input: $input) {
    ...UserManagementDetailUser
  }
}
    ${UserManagementDetailUserFragmentDoc}`;
export type UserManagementAddUserToCognitoGroupMutationFn = Apollo.MutationFunction<UserManagementAddUserToCognitoGroupMutation, UserManagementAddUserToCognitoGroupMutationVariables>;

/**
 * __useUserManagementAddUserToCognitoGroupMutation__
 *
 * To run a mutation, you first call `useUserManagementAddUserToCognitoGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserManagementAddUserToCognitoGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userManagementAddUserToCognitoGroupMutation, { data, loading, error }] = useUserManagementAddUserToCognitoGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserManagementAddUserToCognitoGroupMutation(baseOptions?: Apollo.MutationHookOptions<UserManagementAddUserToCognitoGroupMutation, UserManagementAddUserToCognitoGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserManagementAddUserToCognitoGroupMutation, UserManagementAddUserToCognitoGroupMutationVariables>(UserManagementAddUserToCognitoGroupDocument, options);
      }
export type UserManagementAddUserToCognitoGroupMutationHookResult = ReturnType<typeof useUserManagementAddUserToCognitoGroupMutation>;
export type UserManagementAddUserToCognitoGroupMutationResult = Apollo.MutationResult<UserManagementAddUserToCognitoGroupMutation>;
export type UserManagementAddUserToCognitoGroupMutationOptions = Apollo.BaseMutationOptions<UserManagementAddUserToCognitoGroupMutation, UserManagementAddUserToCognitoGroupMutationVariables>;
export const UserManagementRemoveUserFromCognitoGroupDocument = gql`
    mutation UserManagementRemoveUserFromCognitoGroup($input: ModifyUserCognitoGroupsInput!) {
  removeUserFromCognitoGroup(input: $input) {
    ...UserManagementDetailUser
  }
}
    ${UserManagementDetailUserFragmentDoc}`;
export type UserManagementRemoveUserFromCognitoGroupMutationFn = Apollo.MutationFunction<UserManagementRemoveUserFromCognitoGroupMutation, UserManagementRemoveUserFromCognitoGroupMutationVariables>;

/**
 * __useUserManagementRemoveUserFromCognitoGroupMutation__
 *
 * To run a mutation, you first call `useUserManagementRemoveUserFromCognitoGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserManagementRemoveUserFromCognitoGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userManagementRemoveUserFromCognitoGroupMutation, { data, loading, error }] = useUserManagementRemoveUserFromCognitoGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserManagementRemoveUserFromCognitoGroupMutation(baseOptions?: Apollo.MutationHookOptions<UserManagementRemoveUserFromCognitoGroupMutation, UserManagementRemoveUserFromCognitoGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserManagementRemoveUserFromCognitoGroupMutation, UserManagementRemoveUserFromCognitoGroupMutationVariables>(UserManagementRemoveUserFromCognitoGroupDocument, options);
      }
export type UserManagementRemoveUserFromCognitoGroupMutationHookResult = ReturnType<typeof useUserManagementRemoveUserFromCognitoGroupMutation>;
export type UserManagementRemoveUserFromCognitoGroupMutationResult = Apollo.MutationResult<UserManagementRemoveUserFromCognitoGroupMutation>;
export type UserManagementRemoveUserFromCognitoGroupMutationOptions = Apollo.BaseMutationOptions<UserManagementRemoveUserFromCognitoGroupMutation, UserManagementRemoveUserFromCognitoGroupMutationVariables>;