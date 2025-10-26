import { defineStore } from 'pinia';
import { ref } from 'vue';

const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);


  const initAuth = () => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const expired = new Date(parsed.expiresAt) < new Date();
      if (!expired) {
        user.value = parsed.user;
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  };

  const login = (email, password) => {
    console.log('Login attempt:', { email, password });
    
    if (!email || !password) return { error: "All fields required" };

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    console.log('All users in storage:', users);
    
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    
    console.log('Found user:', existingUser);

    if (!existingUser) return { error: "Invalid email or password" };

    const session = {
      user: { email: existingUser.email, name: "Demo User" },
      token: "mock-token-" + Math.random().toString(36).substring(2),
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24h
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    user.value = session.user;
    
    console.log('Login successful, user set:', user.value);

    return { success: true };
  };

  const signup = (email, password) => {
    console.log('Signup attempt:', { email, password });
    
    if (!email || !password) return { error: "All fields required" };

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    console.log('Existing users:', users);
    
    const existingUser = users.find((u) => u.email === email);
    
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return { error: "User already exists" };
    }

    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    console.log('User registered successfully:', { email });
    console.log('All users after signup:', users);

    return { success: true };
  };

const logout = () => {
  console.log('Logout called, current user:', user.value);
  localStorage.removeItem(SESSION_KEY);
  
  
  setTimeout(() => {
    user.value = null;
    console.log('User after logout:', user.value);
    
    window.location.href = '/auth/login';
  }, 0);
};
  return {
    user,
    initAuth,
    login,
    signup,
    logout
  };
});