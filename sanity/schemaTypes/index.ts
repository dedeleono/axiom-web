import type { SchemaTypeDefinition } from 'sanity'
import project from './project'
import whoWeAre from './whoWeAre'
import awards from './awards'
import home from './home'
import innovation from './innovation'
import service from './service'
import whyChooseUs from './whyChooseUs'
import faqPage from './faqPage'
import philosophySection from './philosophySection'
import { post, author, blogSettings } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, whoWeAre, awards, home, innovation, service, whyChooseUs, faqPage, philosophySection, post, author, blogSettings],
}
