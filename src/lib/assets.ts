/**
 * Asset paths from /public.
 * Priority: UIBundleFree (textures/decor) > Icons_Essential > Complete_UI_Essential_Pack_Free
 */

const UI =
  "/Complete_UI_Essential_Pack_Free/Complete_UI_Essential_Pack_Free/01_Flat_Theme/Sprites";
const ICONS = "/Icons_Essential/Icons_Essential/v1.2/Icons";
const UIBUNDLE = "/UIBundleFree";

export const assets = {
  /** UIBundleFree: optional texture for panels (tiled or section bg) */
  uiBundle: {
    freeUI: `${UIBUNDLE}/FreeUI.png`,
    pastelUI: `${UIBUNDLE}/PastelUIFree.png`,
  },
  /** Panels, frames, buttons – Complete_UI_Essential_Pack_Free */
  panelFrame: `${UI}/UI_Flat_Frame01a.png`,
  navBar: `${UI}/UI_Flat_Bar01a.png`,
  button: `${UI}/UI_Flat_Button01a_1.png`,
  buttonHover: `${UI}/UI_Flat_Button01a_2.png`,
  /** Section nav – Icons_Essential */
  icons: {
    home: `${ICONS}/Home.png`,
    info: `${ICONS}/Info.png`,
    briefcase: `${ICONS}/Briefcase.png`,
    gear: `${ICONS}/Gear.png`,
    document: `${ICONS}/Document.png`,
    letter: `${ICONS}/Letter.png`,
  },
} as const;
