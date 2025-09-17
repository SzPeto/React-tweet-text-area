export const resourcesCustom = [
  { 
    name: 'tweets', 
    list: '/tweets',
    create: '/tweets/create',
    show: '/tweets/:id',
    edit: '/tweets/:id/edit',
    meta: { label: 'Tweets' }
  },
  { 
    name: 'users', 
    list: '/users',
    create: '/users/create',
    show: '/users/:id',
    edit: '/users/:id/edit',
    meta: { label: 'Users' }
  },
]