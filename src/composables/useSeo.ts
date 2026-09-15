import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

const SITE_URL = 'https://beepsoftware.com'
const DEFAULT_TITLE = 'BEEP Software'
const DEFAULT_DESCRIPTION = 'BEEP Software engineers modern, efficient, and scalable software solutions for businesses.'

// Registers reactive per-route <title>/meta/canonical tags plus site-wide Organization structured data.
export function useSeo() {
  const route = useRoute()

  const title = computed(() => route.meta.title ?? DEFAULT_TITLE)
  const description = computed(() => route.meta.description ?? DEFAULT_DESCRIPTION)
  const canonicalUrl = computed(() => `${SITE_URL}${route.path}`)
  const robots = computed(() => (route.meta.noindex ? 'noindex,follow' : 'index,follow'))

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${SITE_URL}/full_logo.png` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'BEEP Software',
          url: SITE_URL,
          logo: `${SITE_URL}/full_logo.png`,
          email: 'inquire@beepsoftware.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Louisville',
            addressRegion: 'KY',
            addressCountry: 'US',
          },
        }),
      },
    ],
  })
}
