import type { SchemaTypeDefinition } from 'sanity'
import project from './project'
import philosophy from './philosophy'
import whoWeAre from './whoWeAre'
import awards from './awards'
import home from './home'
import innovation from './innovation'
import service from './service'
import whyChooseUs from './whyChooseUs'
import { post, author, blogSettings } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, philosophy, whoWeAre, awards, home, innovation, service, whyChooseUs, post, author, blogSettings],
}
