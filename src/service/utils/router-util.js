export const meta = (payload) => {
  return payload ? { ...payload } : { layout: 'default' }
}

export function routerMapper({ name, path, meta }) {
  return { name, path, meta }
}
