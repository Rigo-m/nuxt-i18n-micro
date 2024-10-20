import type { PluginsInjections } from '../plugins/01.plugin'
import { useNuxtApp } from '#imports'

type RemoveDollarSign<T> = {
  [K in keyof T as K extends `$${infer Rest}` ? Rest : K]: T[K]
}

export type PluginsInjectionsWithAliases = PluginsInjections & RemoveDollarSign<PluginsInjections>

export function useI18n(): PluginsInjectionsWithAliases {
  const nuxtApp = useNuxtApp()

  const injections = {
    $defaultLocale: nuxtApp.$defaultLocale,
    $getLocale: nuxtApp.$getLocale,
    $getLocales: nuxtApp.$getLocales,
    $getRouteName: nuxtApp.$getRouteName,
    $t: nuxtApp.$t,
    $tn: nuxtApp.$tn,
    $td: nuxtApp.$td,
    $has: nuxtApp.$has,
    $tc: nuxtApp.$tc,
    $mergeTranslations: nuxtApp.$mergeTranslations,
    $setI18nRouteParams: nuxtApp.$setI18nRouteParams,
    $switchLocaleRoute: nuxtApp.$switchLocaleRoute,
    $switchLocalePath: nuxtApp.$switchLocalePath,
    $switchLocale: nuxtApp.$switchLocale,
    $localeRoute: nuxtApp.$localeRoute,
    $localePath: nuxtApp.$localePath,
  } as const

  const noDollarInjections = Object.fromEntries(
    Object.entries(injections).map(([key, value]) => [key.slice(1), value]),
  )

  return {
    ...injections,
    ...noDollarInjections,
  } as PluginsInjectionsWithAliases
}
