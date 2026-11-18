// One entry per camera part. "id" must match the mesh name in the 3D model.
// "explode" = how far the part moves in the exploded view: [x, y, z].
// "article" (optional) = slug of a Knowledge Base article to link to.
// Layout is simplified: real cameras differ between models.
export const cameraParts = [
  // ---------- Body ----------
  {
    id: 'body',
    name: 'Camera body',
    group: 'Body',
    explode: [0, 0, 0],
    summary:
      'The light-tight housing that holds every internal part and the mount for the lens.',
    explanation:
      'The body keeps stray light away from the sensor, supports the lens mount and holds the controls, battery and electronics. It is drawn see-through so the parts inside can be seen, and it stays in place in the exploded view as a reference outline. It can only be picked from the list.',
  },
  {
    id: 'grip',
    name: 'Hand grip',
    group: 'Body',
    explode: [-1.4, 0, 0],
    summary: 'The molded handle that gives a secure hold on the camera.',
    explanation:
      'On most DSLRs the grip is on the photographer right-hand side and often contains the battery compartment. Its shape and size vary a lot between models.',
  },
  {
    id: 'battery',
    name: 'Battery',
    group: 'Body',
    explode: [0, -1.5, 0],
    summary: 'A rechargeable battery that powers the whole camera.',
    explanation:
      'Most modern cameras use rechargeable lithium-ion batteries to power the sensor, processor, screen, autofocus motors and shutter. The battery position differs between models. In many DSLRs it sits in the grip.',
  },
  {
    id: 'rearScreen',
    name: 'Rear screen',
    group: 'Body',
    explode: [0, 0, -3.4],
    summary: 'The display on the back used for menus, playback and live view.',
    explanation:
      'The screen shows menus and recorded photographs. In live view it also shows the image from the sensor. Some screens tilt or swivel, and many are touch-sensitive.',
  },
  {
    id: 'controls',
    name: 'Top controls',
    group: 'Body',
    explode: [0, 0.8, 0],
    summary: 'The shutter button and the mode dial.',
    explanation:
      'On most cameras a half press of the shutter button starts metering and autofocus, and a full press makes the exposure. The mode dial chooses how the camera sets exposure, for example manual, aperture priority or shutter priority. Layouts differ between brands.',
    article: 'exposure-triangle',
  },

  // ---------- Lens ----------
  {
    id: 'lensMount',
    name: 'Lens mount',
    group: 'Lens',
    explode: [0, 0, 0.4],
    summary: 'The connection that attaches the lens to the camera body.',
    explanation:
      'Most interchangeable-lens cameras use a bayonet mount: the lens is pushed in and turned to lock. Electrical contacts let the camera and lens communicate. Mounts differ between manufacturers and systems, so a lens must match the mount. Mirrorless cameras generally place the mount closer to the sensor than DSLRs do.',
  },
  {
    id: 'lensBarrel',
    name: 'Lens barrel',
    group: 'Lens',
    explode: [0, 0, 2.6],
    summary:
      'The outer tube of the lens that holds the glass elements and keeps them aligned.',
    explanation:
      'Real barrels also contain the focus and zoom mechanisms and often motors and image stabilization. This placeholder shows only the outer shape, drawn see-through, so it can only be picked from the list.',
  },
  {
    id: 'focusRing',
    name: 'Focus ring',
    group: 'Lens',
    explode: [0, 0, 3.4],
    summary: 'A textured ring you turn by hand to adjust focus.',
    explanation:
      'On many modern lenses the ring does not move the glass directly. It sends a signal to a motor, which is called focus-by-wire. The ridges are for grip.',
  },
  {
    id: 'lensElements',
    name: 'Lens elements',
    group: 'Lens',
    explode: [0, 0, 1.1],
    summary:
      'Pieces of shaped glass that bend light so it forms a sharp image on the sensor.',
    explanation:
      'A real lens contains several to more than twenty elements arranged in groups, including special elements that reduce optical errors. Focusing usually moves one or more of these groups. This placeholder shows three elements standing in for all of them.',
    article: 'focal-length',
  },
  {
    id: 'aperture',
    name: 'Aperture diaphragm',
    group: 'Lens',
    explode: [0, 0, 0.5],
    summary:
      'Overlapping blades that form an adjustable opening to set how much light passes through the lens.',
    explanation:
      'The size of the opening is described by the f-number. A wider opening lets in more light and gives a shallower depth of field. Many lenses use somewhere between five and nine blades. On many cameras the opening stays wide while you compose and closes to the chosen size only during the exposure.',
    article: 'aperture',
  },

  // ---------- Viewfinder (DSLR only) ----------
  {
    id: 'mirror',
    name: 'Reflex mirror',
    group: 'Viewfinder (DSLR only)',
    explode: [0, 0, 0],
    summary:
      'An angled mirror that sends the lens image up to the optical viewfinder, then flips out of the way for the exposure.',
    explanation:
      'While you compose, the mirror reflects light up toward the focusing screen and pentaprism. When you press the shutter button it swings up so light can reach the sensor, which is why the viewfinder goes dark for a moment. Mirrorless cameras have no mirror and show the sensor image on a screen or electronic viewfinder.',
  },
  {
    id: 'focusingScreen',
    name: 'Focusing screen',
    group: 'Viewfinder (DSLR only)',
    explode: [0, 0.9, 0],
    summary:
      'A ground-glass surface where the lens image is formed for the viewfinder.',
    explanation:
      'The mirror sends the image up onto this screen, which is placed at the same optical distance as the sensor, so what looks sharp on it will be sharp on the sensor. Many screens also carry markings such as focus points.',
  },
  {
    id: 'pentaprism',
    name: 'Pentaprism',
    group: 'Viewfinder (DSLR only)',
    explode: [0, 1.8, 0],
    summary: 'A glass block that makes the viewfinder image appear the right way round.',
    explanation:
      'The image on the focusing screen is reversed left to right. The pentaprism reflects the light several times inside the glass so the viewfinder shows the scene correctly. Some cameras use a lighter arrangement of mirrors, called a pentamirror, instead.',
  },
  {
    id: 'eyepiece',
    name: 'Viewfinder eyepiece',
    group: 'Viewfinder (DSLR only)',
    explode: [0, 1.8, -0.9],
    summary: 'The small lens at the back that you look through.',
    explanation:
      'It magnifies the viewfinder image. Many cameras include a dial next to it, called a diopter adjustment, to match it to the eyesight of the photographer.',
  },

  // ---------- Imaging ----------
  {
    id: 'shutter',
    name: 'Focal-plane shutter',
    group: 'Imaging',
    explode: [0, 0, -0.5],
    summary:
      'Curtains in front of the sensor that open to start an exposure and close to end it.',
    explanation:
      'In a mechanical focal-plane shutter, two curtains travel across the sensor, and the time between them sets the shutter speed. While closed, the shutter also protects the sensor. Many mirrorless cameras can also expose electronically.',
    article: 'shutter-speed',
  },
  {
    id: 'sensor',
    name: 'Image sensor',
    group: 'Imaging',
    explode: [0, 0, -1.0],
    summary:
      'A chip covered with millions of light-sensitive photosites that turns light into an electrical signal.',
    explanation:
      'Each photosite records how much light reached it. A pattern of colour filters over the photosites lets the camera work out colour. Most current cameras use CMOS sensors. Sensor size differs between cameras and affects the field of view and depth of field you get from a given lens.',
  },
  {
    id: 'processor',
    name: 'Image processor',
    group: 'Imaging',
    explode: [0, 0, -1.6],
    summary:
      'Electronics that turn the sensor data into a finished image and run the camera.',
    explanation:
      'The processor handles the data from the sensor, applies noise reduction and your chosen settings, and saves the image file. It often also supports autofocus, metering and the screen. Real cameras spread this work across several chips and circuit boards, so the board shown here is illustrative.',
  },
]