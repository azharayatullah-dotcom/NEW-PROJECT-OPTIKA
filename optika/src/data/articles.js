// Each article is one object. To add a topic later, copy an object,
// change its fields and add it to the list.
//
// Fields:
//   slug            unique, lowercase, used in the URL (/knowledge/aperture)
//   category        must match a category id in categories.js
//   difficulty      'beginner' | 'intermediate' | 'advanced'
//   dateAdded       'YYYY-MM-DD', used for "recently added" on the homepage
//   definition      one clear sentence or two
//   sections        the detailed explanation, as headings with paragraphs
//   examples        practical applications (typical choices, not strict rules)
//   simplifiedNote  where a model is simplified (empty string if none)
//   related         slugs of other articles (only slugs that exist)
//   cameraLabParts  names of 3D parts in the Camera Lab (empty until Phase 6)
//   references      only sources that are known to exist

export const articles = [
  {
    slug: 'aperture',
    title: 'Aperture',
    category: 'exposure',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'The adjustable opening in a lens that controls how much light reaches the sensor and influences depth of field.',
    definition:
      'Aperture is the opening inside a lens through which light passes on its way to the sensor. Its size is written as an f-number such as f/2.8 or f/8, which is the lens focal length divided by the diameter of the opening as seen from the front of the lens (the entrance pupil).',
    sections: [
      {
        heading: 'Reading f-numbers',
        body: [
          'Because an f-number is a ratio, a larger number means a smaller opening. A 50 mm lens at f/2 has an entrance pupil about 25 mm across (50 ÷ 2). At f/8 the same lens has an opening of about 6 mm.',
          'The standard full-stop sequence is f/1, f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16, f/22. Moving one step along the sequence changes the light reaching the sensor by a factor of two. The f-number changes by about 1.4 (the square root of 2) per step because the light-gathering area depends on the square of the diameter.',
        ],
      },
      {
        heading: 'Aperture and exposure',
        body: [
          'A wider aperture (smaller f-number) lets in more light, so the same scene needs a shorter shutter time or a lower ISO to be correctly exposed. A narrower aperture lets in less light and requires the opposite. This trade-off is one corner of the exposure triangle.',
          'Most cameras also offer settings between full stops, usually in thirds of a stop, for example f/3.5 or f/6.3.',
        ],
      },
      {
        heading: 'Aperture and depth of field',
        body: [
          'Depth of field is the range of distances that appears acceptably sharp in a photograph. Widening the aperture makes this range shallower, so the background and foreground blur more. Narrowing the aperture makes it deeper.',
          'Aperture is not the only factor. Focal length, the distance to the subject and the sensor size all affect depth of field as well.',
        ],
      },
      {
        heading: 'Aperture and image sharpness',
        body: [
          'Lenses are often a little less sharp at their widest aperture because of optical aberrations. At very small apertures, diffraction (light bending as it passes the small opening) softens the whole image. Many lenses are sharpest somewhere in the middle of their range, but the exact aperture differs from lens to lens.',
        ],
      },
    ],
    examples: [
      'Portraits: apertures around f/1.8 to f/2.8 are commonly used to blur the background and separate the subject.',
      'Landscapes: apertures around f/8 to f/11 are commonly used to keep both near and far elements reasonably sharp.',
      'Low light: a wide aperture allows a faster shutter speed or lower ISO than a narrow one.',
    ],
    simplifiedNote:
      'The f-number describes the geometric size of the opening. Real lenses also lose a small amount of light inside the glass, which is why cinema lenses are sometimes marked with T-numbers instead.',
        related: ['shutter-speed', 'iso', 'exposure-triangle', 'depth-of-field'],
    cameraLabParts: [],
    references: [],
  },

  {
    slug: 'shutter-speed',
    title: 'Shutter Speed',
    category: 'exposure',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'How long the sensor is exposed to light, which controls exposure and how motion appears in a photograph.',
    definition:
      'Shutter speed is the length of time the shutter stays open so that light can reach the sensor, usually written in seconds or fractions of a second, such as 1/250 or 2".',
    sections: [
      {
        heading: 'Reading shutter speeds',
        body: [
          'A shutter speed of 1/250 means the sensor is exposed for one two-hundred-and-fiftieth of a second. A larger denominator is a shorter exposure.',
          'A common full-stop sequence is 1/1000, 1/500, 1/250, 1/125, 1/60, 1/30, 1/15, 1/8, 1/4, 1/2, 1 second. Each step doubles or halves the exposure time, which doubles or halves the light collected. Cameras often show intermediate values as well.',
        ],
      },
      {
        heading: 'Freezing and blurring motion',
        body: [
          'A short exposure captures a moving subject at almost a single instant, so it looks frozen. A long exposure records the subject across its movement, which appears as motion blur.',
          'How fast is fast enough depends on how quickly the subject moves across the frame. That depends on its real speed, its direction, how far away it is and the focal length in use.',
        ],
      },
      {
        heading: 'Camera shake',
        body: [
          'Hand movement blurs the entire image, not only the moving subject. A well-known rule of thumb suggests a shutter speed no longer than about 1 divided by the focal length (for 35 mm full-frame equivalent) when shooting handheld. It is a rough guideline only. Image stabilization and a steady technique can allow slower speeds.',
        ],
      },
      {
        heading: 'Types of shutter',
        body: [
          'Many cameras use a mechanical focal-plane shutter made of curtains that travel across the sensor. Many mirrorless cameras can also expose electronically by reading the sensor line by line.',
          'With an electronic shutter, fast-moving subjects can appear skewed because different parts of the sensor are read at slightly different moments. This effect is called rolling shutter. Mechanical focal-plane shutters also limit the fastest speed at which a flash can fully expose the frame (the flash sync speed).',
        ],
      },
    ],
    examples: [
      'Sports and wildlife: fast shutter speeds such as 1/1000 or faster are commonly used to freeze quick movement.',
      'Walking people: speeds around 1/125 to 1/250 are often enough for everyday street scenes.',
      'Flowing water: exposures of half a second to several seconds, taken on a tripod, blur the water while keeping the rest of the scene sharp.',
    ],
    simplifiedNote:
      'The 1/focal-length rule is a rule of thumb and depends on sensor resolution, stabilization and the photographer, so treat it as a starting point and not a guarantee.',
        related: ['aperture', 'iso', 'exposure-triangle'],
    cameraLabParts: [],
    references: [],
  },

  {
    slug: 'iso',
    title: 'ISO',
    category: 'exposure',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'The setting that determines how strongly the camera brightens the signal from the sensor, with a trade-off in image noise.',
    definition:
      'ISO is a standardized scale of sensitivity. In a digital camera, the ISO setting determines how bright the final image is for a given amount of light reaching the sensor, by controlling how much the captured signal is amplified.',
    sections: [
      {
        heading: 'The ISO scale',
        body: [
          'Common values are 100, 200, 400, 800, 1600 and so on. Doubling the ISO is a change of one stop: for the same amount of light, the image comes out twice as bright. Cameras usually offer intermediate steps too.',
        ],
      },
      {
        heading: 'What ISO does and does not do',
        body: [
          'Raising the ISO does not make the sensor collect more light. The amount of light captured is set by the aperture, the shutter speed and the scene. ISO changes how much that captured signal is amplified to reach the target brightness.',
          'This is why ISO is the setting to raise when you cannot widen the aperture or lengthen the shutter time any further.',
        ],
      },
      {
        heading: 'ISO and noise',
        body: [
          'Image noise appears as grain or colour speckling. Much of it comes from the random way light arrives (shot noise) and from the camera electronics (read noise). At a high ISO, the sensor has usually collected less light for the same final brightness, so the random variation is a larger part of the image and noise becomes more visible.',
          'High ISO settings can also reduce dynamic range, which is the span between the darkest and brightest details the camera can record.',
        ],
      },
      {
        heading: 'Base ISO and extended ISO',
        body: [
          'Most cameras have a lowest native setting, the base ISO, which usually gives the cleanest image and the most dynamic range. Settings beyond the native range, often labelled "Hi" or "Lo", are produced by processing and generally come with compromises. How noise behaves at each ISO differs between camera models.',
        ],
      },
    ],
    examples: [
      'Bright daylight: base ISO is usually enough, which gives the cleanest image.',
      'Indoor or evening scenes: a higher ISO allows a fast enough shutter speed to avoid blur without a tripod.',
      'Tripod landscapes: low ISO is preferred because a longer exposure is possible.',
    ],
    simplifiedNote:
      'This is a simplified model. How a given camera applies gain, and how much noise that adds, depends on the sensor design, so two cameras at the same ISO can look different.',
       related: ['aperture', 'shutter-speed', 'exposure-triangle'],
    cameraLabParts: [],
    references: [
      {
        label:
          'ISO 12232: Photography — Digital still cameras — Determination of exposure index, ISO speed ratings, standard output sensitivity, and recommended exposure index',
        url: '',
      },
    ],
  },
  
  {
    slug: 'exposure-triangle',
    title: 'Exposure Triangle',
    category: 'exposure',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'A teaching model showing how aperture, shutter speed and ISO work together to set the brightness of a photograph.',
    definition:
      'The exposure triangle is a teaching model that links three camera settings, aperture, shutter speed and ISO, to the brightness of a photograph. Each setting also changes something else about the image, so choosing between them is a creative decision.',
    sections: [
      {
        heading: 'Three settings, three side effects',
        body: [
          'Aperture controls how much light passes through the lens, and it also changes the depth of field. Shutter speed controls how long the sensor is exposed, and it also changes how motion looks. ISO controls how strongly the signal is amplified, and it also changes how visible noise is.',
          'All three affect brightness, but each has a different side effect on the picture. That is why the same brightness can be reached in several ways that look quite different.',
        ],
      },
      {
        heading: 'Trading stops',
        body: [
          'A stop is a doubling or halving of exposure. If you make one setting let in one stop more light, you can cancel it by making another setting one stop less sensitive, and the brightness stays the same.',
          'For example, f/8 at 1/125 s and ISO 100 gives the same brightness as f/5.6 at 1/250 s and ISO 100. The aperture is one stop wider and the shutter is one stop faster, so the two changes cancel. The second version has a shallower depth of field and freezes motion better.',
          'Likewise, f/8 at 1/250 s and ISO 200 matches f/8 at 1/125 s and ISO 100. You gave up one stop of shutter time and made it back with one stop of ISO, at the cost of more visible noise.',
        ],
      },
      {
        heading: 'Deciding what to prioritize',
        body: [
          'A practical way to use the triangle is to decide what matters most for the scene, then let the other settings follow. If you want a blurred background, choose a wide aperture first. If you must freeze movement, choose the shutter speed first. If you want the cleanest image, keep ISO low and adjust the others.',
          'Camera modes reflect this. In aperture priority you choose the aperture and the camera picks the shutter speed. In shutter priority you choose the shutter speed and the camera picks the aperture. In manual mode you choose everything.',
        ],
      },
      {
        heading: 'When the triangle runs out of room',
        body: [
          'Each setting has limits. A lens has a widest aperture, a handheld shot has a slowest usable shutter speed, and a camera has a highest ISO that still looks acceptable. In dim light you can reach all three limits at once, and then the photograph will be darker, blurrier or noisier than you would like.',
        ],
      },
    ],
    examples: [
      'Portrait indoors: a wide aperture for background blur, a shutter speed fast enough to avoid blur from movement, and ISO raised as far as needed to reach a good brightness.',
      'Landscape on a tripod: a mid-range aperture for depth, base ISO for quality, and a long shutter speed to make up the light.',
      'Moving subject in daylight: a fast shutter speed first, then the aperture and ISO chosen to get the brightness you want.',
    ],
    simplifiedNote:
      'This is a simplified model. Strictly, the amount of light captured depends on the scene, the aperture and the shutter time. ISO changes how that signal is amplified, not how much light the sensor collects. The triangle is useful because the three settings combine to determine the final brightness.',
    related: ['aperture', 'shutter-speed', 'iso'],
    cameraLabParts: [],
    references: [],
  },

  {
    slug: 'focal-length',
    title: 'Focal Length',
    category: 'optics',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'A lens property, measured in millimetres, that together with sensor size determines the angle of view of a photograph.',
    definition:
      'Focal length is an optical property of a lens, measured in millimetres. For a lens focused at infinity it is the distance from the lens optical centre (its rear principal plane) to the sensor. Together with the size of the sensor, it determines the angle of view.',
    sections: [
      {
        heading: 'Focal length and angle of view',
        body: [
          'A shorter focal length gives a wider angle of view, so more of the scene fits in the frame. A longer focal length gives a narrower angle of view, so the scene looks magnified.',
          'The angle of view can be calculated as 2 × arctan(d ÷ 2f), where d is the sensor dimension being measured and f is the focal length. On a full-frame sensor (36 mm wide), a 24 mm lens covers about 74 degrees horizontally, a 50 mm lens about 40 degrees, and a 200 mm lens about 10 degrees.',
        ],
      },
      {
        heading: 'Sensor size matters',
        body: [
          'The same lens shows a narrower view on a smaller sensor, because the sensor records only the central part of the image the lens projects. This is why focal lengths are often quoted as a 35 mm full-frame equivalent. It states which full-frame lens would give the same angle of view.',
          'The equivalent is calculated with the crop factor, the ratio between the full-frame diagonal and the diagonal of the smaller sensor. It describes the angle of view only. It does not change the real focal length printed on the lens.',
        ],
      },
      {
        heading: 'Common ranges',
        body: [
          'Wide-angle lenses (roughly 35 mm or shorter on full frame) show a broad view and suit landscapes, architecture and interiors. Standard lenses (around 50 mm) give a view close to how the eye frames a scene. Telephoto lenses (roughly 85 mm and longer) magnify distant subjects and suit portraits, sport and wildlife. These ranges are conventions, not strict boundaries.',
        ],
      },
      {
        heading: 'Focal length and perspective',
        body: [
          'A common belief is that a long lens flattens a scene and a wide lens stretches it. Perspective, meaning the relative size of near and far objects, is actually decided by where the camera is, not by the focal length. A longer lens changes perspective only because photographers tend to stand farther back to fit the subject in.',
          'If you stay in the same spot and crop a wide-angle photograph to match a telephoto photograph, the perspective is identical. The difference is the resolution of the result.',
        ],
      },
    ],
    examples: [
      'Interior of a small room: a wide lens such as 16 mm to 24 mm (full-frame equivalent) fits more of the space into the frame.',
      'Head-and-shoulders portrait: around 85 mm is a common choice because it allows a comfortable working distance.',
      'Distant wildlife: 300 mm or more is typically needed to fill the frame from a safe distance.',
    ],
    simplifiedNote:
      'The angle-of-view formula assumes the lens is focused at infinity. When a lens focuses on nearer subjects the angle of view can change slightly, an effect often called focus breathing, and it varies from lens to lens.',
    related: ['depth-of-field', 'aperture'],
    cameraLabParts: [],
    references: [],
  },

  {
    slug: 'depth-of-field',
    title: 'Depth of Field',
    category: 'optics',
    difficulty: 'intermediate',
    dateAdded: '2026-11-17',
    summary:
      'The range of distances in a photograph that looks acceptably sharp, and the factors that make it shallower or deeper.',
    definition:
      'Depth of field is the range of distances in front of and behind the focused subject that appears acceptably sharp in a photograph. Only one distance is in perfect focus. Sharpness fades gradually on either side of it, and depth of field describes how far that acceptable zone extends.',
    sections: [
      {
        heading: 'What makes sharpness acceptable',
        body: [
          'A point outside the focus distance is recorded as a small blur disc instead of a point. If the disc is small enough that the eye cannot tell it from a point, that part of the picture counts as sharp. The largest blur disc still treated as sharp is called the circle of confusion.',
          'Because of this, depth of field depends on how the photograph is viewed. A larger print, or a viewer standing closer, makes smaller blur discs visible and shrinks the apparent depth of field. The values used in lens scales and calculators assume a standard viewing situation.',
        ],
      },
      {
        heading: 'Four main factors',
        body: [
          'Aperture: a wider aperture (smaller f-number) gives a shallower depth of field, and a narrower aperture gives a deeper one.',
          'Subject distance: the closer the focus distance, the shallower the depth of field. Close-up and macro photography have very thin zones of sharpness.',
          'Focal length: at the same distance and aperture, a longer focal length gives a shallower depth of field.',
          'Sensor size: to take the same framing with the same f-number, a larger sensor needs a longer lens or a closer position, which results in a shallower depth of field.',
        ],
      },
      {
        heading: 'Focal length and framing together',
        body: [
          'The effect of focal length changes when you also change your position. If you keep the subject the same size in the frame by moving, the depth of field is nearly the same at different focal lengths for typical portrait distances. The perceived blur differs mainly because the background is magnified differently.',
        ],
      },
      {
        heading: 'Hyperfocal distance',
        body: [
          'The hyperfocal distance is the focus distance that makes everything from about half that distance to infinity acceptably sharp. It is used in landscape photography to maximize depth of field. Its value depends on the focal length, the aperture and the circle of confusion you accept.',
        ],
      },
      {
        heading: 'Depth of field and bokeh',
        body: [
          'Depth of field says how much of the image is sharp. Bokeh describes the look and quality of the out-of-focus areas, for example how smooth the blur is or what shape bright highlights take. Two lenses can have the same depth of field and different bokeh.',
        ],
      },
    ],
    examples: [
      'Portrait: a wide aperture and a longer lens keep the eyes sharp and let the background blur.',
      'Landscape: a narrower aperture, a wider lens and a well-chosen focus distance keep both foreground and horizon sharp.',
      'Macro: even at narrow apertures the sharp zone can be a few millimetres, so careful focusing matters.',
    ],
    simplifiedNote:
      'The sharp zone is not a hard-edged slab. Sharpness falls off gradually, and where it is judged acceptable depends on print size, viewing distance and the viewer. Calculators give useful estimates, not exact boundaries.',
    related: ['aperture', 'focal-length', 'exposure-triangle'],
    cameraLabParts: [],
    references: [],
  },

  {
    slug: 'rule-of-thirds',
    title: 'Rule of Thirds',
    category: 'composition',
    difficulty: 'beginner',
    dateAdded: '2026-11-17',
    summary:
      'A composition guideline that divides the frame into a three-by-three grid and places key elements along its lines or intersections.',
    definition:
      'The rule of thirds is a composition guideline. Imagine the frame divided by two horizontal and two vertical lines into nine equal parts. Placing important elements along those lines, or where they cross, tends to give a more balanced and dynamic image than centring everything.',
    sections: [
      {
        heading: 'How to use the grid',
        body: [
          'The four points where the lines cross are often called power points. A subject placed on one of them, or a horizon placed on the upper or lower line, creates an off-centre composition that leaves room for the eye to move around the frame.',
          'Many cameras and phones can display this grid on the screen, which makes it easy to practise.',
        ],
      },
      {
        heading: 'Why it often works',
        body: [
          'A centred subject can feel static and symmetrical. Moving the subject off-centre introduces tension and gives space to the rest of the scene. The guideline is also a quick way to decide where a horizon should sit, so that the sky or the land becomes the main part of the picture.',
        ],
      },
      {
        heading: 'Leaving space',
        body: [
          'When a subject looks or moves in one direction, leaving more space in front of it than behind it usually feels natural. Cropping a subject close to the frame edge in the direction it faces often feels cramped.',
        ],
      },
      {
        heading: 'When to break it',
        body: [
          'Symmetrical scenes, strong central subjects and deliberately formal images often work better with a centred composition. Treat the rule as a starting point to test, not as a requirement.',
        ],
      },
    ],
    examples: [
      'Landscape: place the horizon on the lower line to emphasize a dramatic sky, or on the upper line to emphasize the land.',
      'Portrait: put the nearer eye close to an upper intersection.',
      'Moving subject: place a runner on the left third while they move toward the right, leaving space ahead.',
    ],
    simplifiedNote:
      'The rule of thirds is a widely taught guideline, not a law of vision or a measurable principle. Many successful photographs ignore it.',
    related: [],
    cameraLabParts: [],
    references: [],
  },
]
