import { createContext} from 'react'
import type {User } from '../types/app'


export const AuthContext = createContext<
  {
    user: User | null
    loading: boolean
  }
>(
  {
    user: null, 
    loading: true
  }
);


