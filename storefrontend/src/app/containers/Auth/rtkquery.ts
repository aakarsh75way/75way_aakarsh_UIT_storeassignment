import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldValues } from 'react-hook-form';
import { Login, Param, RLogin } from '../../../utils/store/types';


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }), 
  endpoints: (builder) => ({
    registeruser: builder.mutation<void, FieldValues>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginuser: builder.mutation<RLogin, FieldValues>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  
  }),
});

export const { useRegisteruserMutation,useLoginuserMutation } = api;
