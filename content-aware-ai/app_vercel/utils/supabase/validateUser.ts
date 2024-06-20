import { User } from '@supabase/supabase-js';

const users = [
  'ewgenius',
  'lukekim',
  'jeadie',
  'digadeesh',
  'phillipleblanc',
  'y-f-u',
  'sgrebnov',
];

export async function validateUser(user: User) {
  if (users.includes(user.user_metadata.user_name)) {
    return true;
  }

  return false;
}
