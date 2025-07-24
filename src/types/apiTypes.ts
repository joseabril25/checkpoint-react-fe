/**
 * Frontend Types - All types needed for frontend consumption
 * This file contains all the necessary types that the frontend needs to interact with the API
 */

// ===========================
// ENUMS
// ===========================

export type UserStatus = 'active' | 'inactive';
export const UserStatus = {
  ACTIVE: 'active' as UserStatus,
  INACTIVE: 'inactive' as UserStatus,
} as const;

export type StandupStatus = 'draft' | 'submitted';
export const StandupStatus = {
  DRAFT: 'draft' as StandupStatus,
  SUBMITTED: 'submitted' as StandupStatus,
} as const;

export type StandupSortField = 'date' | 'createdAt' | 'updatedAt';
export const StandupSortField = {
  DATE: 'date' as StandupSortField,
  CREATED_AT: 'createdAt' as StandupSortField,
  UPDATED_AT: 'updatedAt' as StandupSortField,
} as const;

export type StandupOrderField = 'asc' | 'desc';
export const StandupOrderField = {
  ASC: 'asc' as StandupOrderField,
  DESC: 'desc' as StandupOrderField,
} as const;

// ===========================
// BASE TYPES
// ===========================

export interface BaseEntity {
  _id?: string; // MongoDB specific
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================
// API RESPONSE TYPES
// ===========================

export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export interface PaginatedApiResponse<T> {
  status: number;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  status: number;
  message: string;
  error?: {
    code: string;
    details?: any;
  };
}

// ===========================
// USER TYPES
// ===========================

export interface User extends BaseEntity {
  email: string;
  name: string;
  timezone: string;
  profileImage?: string;
  status: UserStatus;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  timezone?: string;
  profileImage?: string;
}

export interface UpdateUserRequest {
  name?: string;
  timezone?: string;
  profileImage?: string;
  status?: UserStatus;
}

export interface UserQuery {
  email?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

// ===========================
// AUTH TYPES
// ===========================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  timezone?: string;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ===========================
// STANDUP TYPES
// ===========================

export interface Standup extends BaseEntity {
  userId: string;
  date: Date;
  yesterday: string;
  today: string;
  blockers?: string;
  status: StandupStatus;
  user?: {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
}

export interface CreateStandupRequest {
  yesterday: string;
  today: string;
  blockers?: string;
  status?: StandupStatus;
  date?: Date | string;
}

export interface UpdateStandupRequest {
  yesterday?: string;
  today?: string;
  blockers?: string;
  status?: StandupStatus;
}

export interface StandupQuery {
  userId?: string;
  date?: string | Date;
  dateFrom?: string;
  dateTo?: string;
  status?: StandupStatus;
  page?: number;
  limit?: number;
  sort?: StandupSortField;
  order?: StandupOrderField;
}

export interface StandupPaginatedResponse {
  data: Standup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ===========================
// UTILITY TYPES
// ===========================

export interface Pagination {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// ===========================
// FORM TYPES (for frontend forms)
// ===========================

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  timezone?: string;
  profileImage?: string;
}

export interface StandupForm {
  yesterday: string;
  today: string;
  blockers: string;
  status?: StandupStatus;
  date?: string;
}

// ===========================
// STATE MANAGEMENT TYPES (for Redux/Zustand stores)
// ===========================

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface StandupState {
  standups: Standup[];
  currentStandup: Standup | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  } | null;
  isStandupModalOpen: boolean;
  editingStandup: Standup | null;
}

export interface UsersState {
  users: User[];
  userStandups: Standup[];
}

// ===========================
// FILTER & SEARCH TYPES
// ===========================

export interface StandupFilters {
  userId?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  status?: StandupStatus;
  searchTerm?: string;
}

export interface UserFilters {
  status?: UserStatus;
  searchTerm?: string;
}

// ===========================
// VALIDATION TYPES
// ===========================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// ===========================
// DATE UTILITY TYPES
// ===========================

export interface DateRange {
  from: Date | string;
  to: Date | string;
}

export interface TeamViewConfig {
  showTodayByDefault: boolean;
  defaultUsersToShow: 'all' | 'team' | 'department';
  sortBy: StandupSortField;
  sortOrder: StandupOrderField;
}