declare global {
  namespace NodeJS {
    interface PorcessEnv {
      NODE_ENV: 'development' | 'production'
    }
  }
}

export {};