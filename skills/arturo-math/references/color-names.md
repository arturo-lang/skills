# Named color literals

Copyright © RickBarretto, Arturo programming language.

Use `#name` for a native `:color`, for example `#aliceBlue` or `#rebeccaPurple`. Use `#[...]` for a dictionary. Keep these separate from function aliases: the `#` dictionary constructor does not construct a named color.

This catalog preserves all 578 names and their spellings from the [pinned `colorNames` table](https://github.com/arturo-lang/arturo/blob/4e549e105c54af2e250381d578474b9064d9d4d2/src/vm/values/custom/vcolor.nim#L620-L1199). It is Arturo's catalog; do not substitute a CSS color list or normalize unusual spellings such as `clemantisViolet` or `mediumAquaMarine`. Named colors can be used directly with color transformations, such as `blend #red #aliceBlue`.

```arturo
ensure -> color? #aliceBlue
ensure -> #F0F8FF = #aliceBlue
ensure -> #663399 = #rebeccaPurple
ensure -> dictionary? #[foreground: #rebeccaPurple]
```

## Catalog

Read only the group you need or search for a name. Each entry below is a color literal.

### A

`#acidGreen`, `#algaeGreen`, `#aliceBlue`, `#alienGray`, `#alienGreen`, `#aloeVeraGreen`, `#antiqueBronze`, `#antiqueWhite`, `#aqua`, `#aquamarine`, `#aquamarineStone`, `#armyBrown`, `#armyGreen`, `#ashGray`, `#ashWhite`, `#avocadoGreen`, `#aztechPurple`, `#azure`, `#azureBlue`.

### B

`#babyBlue`, `#babyPink`, `#bakersBrown`, `#balloonBlue`, `#bananaYellow`, `#bashfulPink`, `#basketBallOrange`, `#battleshipGray`, `#beanRed`, `#beer`, `#beetleGreen`, `#beeYellow`, `#beige`, `#bisque`, `#black`, `#blackBean`, `#blackCat`, `#blackCow`, `#blackEel`, `#blanchedAlmond`, `#blonde`, `#bloodNight`, `#bloodRed`, `#blossomPink`, `#blue`, `#blueAngel`, `#blueberryBlue`, `#blueDiamond`, `#blueDress`, `#blueEyes`, `#blueGray`, `#blueGreen`, `#blueHosta`, `#blueIvy`, `#blueJay`, `#blueKoi`, `#blueLagoon`, `#blueLotus`, `#blueMossGreen`, `#blueOrchid`, `#blueRibbon`, `#blueTurquoise`, `#blueViolet`, `#blueWhale`, `#blueZircon`, `#blush`, `#blushPink`, `#blushRed`, `#boldYellow`, `#brass`, `#brightBlue`, `#brightCyan`, `#brightGold`, `#brightGreen`, `#brightLilac`, `#brightMaroon`, `#brightNavyBlue`, `#brightNeonPink`, `#brightOrange`, `#brightPurple`, `#brightTurquoise`, `#bronze`, `#brown`, `#brownBear`, `#brownSand`, `#brownSugar`, `#bulletShell`, `#burgundy`, `#burlyWood`, `#burntPink`, `#butterflyBlue`.

### C

`#cadetBlue`, `#cadillacPink`, `#camelBrown`, `#camouflageGreen`, `#canaryBlue`, `#canaryYellow`, `#cantaloupe`, `#caramel`, `#carbonGray`, `#carbonRed`, `#cardboardBrown`, `#carnationPink`, `#carrotOrange`, `#celeste`, `#chameleonGreen`, `#champagne`, `#charcoal`, `#charcoalBlue`, `#chartreuse`, `#cherryRed`, `#chestnut`, `#chestnutRed`, `#chilliPepper`, `#chocolate`, `#chocolateBrown`, `#cinnamon`, `#clemantisViolet`, `#cloudyGray`, `#cloverGreen`, `#cobaltBlue`, `#coffee`, `#columbiaBlue`, `#constructionConeOrange`, `#cookieBrown`, `#copper`, `#copperRed`, `#coral`, `#coralBlue`, `#cornflowerBlue`, `#cornsilk`, `#cornYellow`, `#cotton`, `#cottonCandy`, `#cranberry`, `#cream`, `#crimson`, `#crimsonPurple`, `#crocusPurple`, `#crystalBlue`, `#cyan`, `#cyanOpaque`.

### D

`#darkBisque`, `#darkBlonde`, `#darkBlue`, `#darkBlueGrey`, `#darkBrown`, `#darkCarnationPink`, `#darkCoffee`, `#darkCyan`, `#darkForestGreen`, `#darkGoldenRod`, `#darkGray`, `#darkGreen`, `#darkHotPink`, `#darkKhaki`, `#darkLimeGreen`, `#darkMagenta`, `#darkMint`, `#darkMoccasin`, `#darkOliveGreen`, `#darkOrange`, `#darkOrchid`, `#darkPink`, `#darkPurple`, `#darkRaspberry`, `#darkRed`, `#darkSalmon`, `#darkSeaGreen`, `#darkSienna`, `#darkSlate`, `#darkSlateBlue`, `#darkSlateGray`, `#darkTurquoise`, `#darkViolet`, `#darkYellow`, `#daySkyBlue`, `#deepEmeraldGreen`, `#deepMauve`, `#deepPeach`, `#deepPeriwinkle`, `#deepPink`, `#deepPurple`, `#deepRed`, `#deepRose`, `#deepSea`, `#deepSeaBlue`, `#deepSeaGreen`, `#deepSkyBlue`, `#deepTeal`, `#deepTurquoise`, `#deepYellow`, `#deerBrown`, `#denimBlue`, `#denimDarkBlue`, `#desertSand`, `#dimGray`, `#dimorphothecaMagenta`, `#dinosaurGreen`, `#dodgerBlue`, `#dollarBillGreen`, `#donutPink`, `#dragonGreen`, `#dullGreenYellow`, `#dullPurple`, `#dullSeaGreen`.

### E

`#earthBlue`, `#earthGreen`, `#eggplant`, `#eggShell`, `#electricBlue`, `#emerald`, `#emeraldGreen`.

### F

`#fallForestGreen`, `#fallLeafBrown`, `#fernGreen`, `#ferrariRed`, `#fireBrick`, `#fireEngineRed`, `#flamingoPink`, `#floralWhite`, `#forestGreen`, `#frenchLilac`, `#frogGreen`, `#fuchsia`.

### G

`#gainsboro`, `#ghostWhite`, `#gingerBrown`, `#glacialBlueIce`, `#gold`, `#goldenBlonde`, `#goldenBrown`, `#goldenRod`, `#goldenSilk`, `#goldenYellow`, `#granite`, `#grape`, `#grapefruit`, `#gray`, `#grayBrown`, `#grayCloud`, `#grayDolphin`, `#grayGoose`, `#grayishTurquoise`, `#grayWolf`, `#green`, `#greenApple`, `#greenishBlue`, `#greenOnion`, `#greenPeas`, `#greenPepper`, `#greenSnake`, `#greenThumb`, `#greenYellow`, `#gulfBlue`, `#gunmetal`.

### H

`#halloweenOrange`, `#harvestGold`, `#hazel`, `#hazelGreen`, `#heavenlyBlue`, `#heliotropePurple`, `#honeyDew`, `#hotDeepPink`, `#hotPink`, `#hummingbirdGreen`.

### I

`#iceberg`, `#iguanaGreen`, `#indianRed`, `#indianSaffron`, `#indigo`, `#iridium`, `#ironGray`, `#ivory`.

### J

`#jade`, `#jadeGreen`, `#jasminePurple`, `#jeansBlue`, `#jellyfish`, `#jetGray`, `#jungleGreen`.

### K

`#kellyGreen`, `#khaki`, `#khakiRose`.

### L

`#lapisBlue`, `#lavaRed`, `#lavender`, `#lavenderBlue`, `#lavenderBlush`, `#lavenderPinocchio`, `#lavenderPurple`, `#lawnGreen`, `#lemonChiffon`, `#lightAquamarine`, `#lightBlack`, `#lightBlue`, `#lightBrown`, `#lightCopper`, `#lightCoral`, `#lightCyan`, `#lightDayBlue`, `#lightFrenchBeige`, `#lightGold`, `#lightGoldenRodYellow`, `#lightGray`, `#lightGreen`, `#lightJade`, `#lightOrange`, `#lightPink`, `#lightPurple`, `#lightPurpleBlue`, `#lightRed`, `#lightRose`, `#lightRoseGreen`, `#lightSalmon`, `#lightSalmonRose`, `#lightSeaGreen`, `#lightSkyBlue`, `#lightSlate`, `#lightSlateBlue`, `#lightSlateGray`, `#lightSteelBlue`, `#lightWhite`, `#lightYellow`, `#lilac`, `#lime`, `#limeGreen`, `#limeMintGreen`, `#linen`, `#lipstickPink`, `#lovelyPurple`, `#loveRed`.

### M

`#macaroniAndCheese`, `#macawBlueGreen`, `#magenta`, `#magicMint`, `#mahogany`, `#mangoOrange`, `#marbleBlue`, `#maroon`, `#mauve`, `#mauveTaupe`, `#mediumAquaMarine`, `#mediumBlue`, `#mediumForestGreen`, `#mediumOrchid`, `#mediumPurple`, `#mediumSeaGreen`, `#mediumSlateBlue`, `#mediumSpringGreen`, `#mediumTeal`, `#mediumTurquoise`, `#mediumVioletRed`, `#metallicGold`, `#metallicSilver`, `#middayBlue`, `#midnight`, `#midnightBlue`, `#milkChocolate`, `#milkWhite`, `#mint`, `#mintCream`, `#mintGreen`, `#mistBlue`, `#mistyRose`, `#moccasin`, `#mocha`, `#mustardYellow`.

### N

`#navajoWhite`, `#navy`, `#nebulaGreen`, `#neonBlue`, `#neonGreen`, `#neonHotPink`, `#neonOrange`, `#neonPink`, `#neonPurple`, `#neonRed`, `#neonYellow`, `#neonYellowGreen`, `#newMidnightBlue`, `#night`, `#nightBlue`, `#northernLightsBlue`.

### O

`#oakBrown`, `#oceanBlue`, `#offWhite`, `#oil`, `#oldBurgundy`, `#oldLace`, `#olive`, `#oliveDrab`, `#oliveGreen`, `#orange`, `#orangeGold`, `#orangeRed`, `#orangeSalmon`, `#orangeYellow`, `#orchid`, `#orchidPurple`, `#organicBrown`.

### P

`#paleBlueLily`, `#paleGoldenRod`, `#paleGreen`, `#paleLilac`, `#paleSilver`, `#paleTurquoise`, `#paleVioletRed`, `#papayaOrange`, `#papayaWhip`, `#parchment`, `#parrotGreen`, `#pastelBlue`, `#pastelGreen`, `#pastelLightBlue`, `#pastelOrange`, `#pastelPink`, `#pastelPurple`, `#pastelRed`, `#pastelViolet`, `#pastelYellow`, `#peach`, `#peachPuff`, `#peaGreen`, `#pearl`, `#periwinkle`, `#periwinklePink`, `#periwinklePurple`, `#peru`, `#pigPink`, `#pineGreen`, `#pink`, `#pinkBrown`, `#pinkBubbleGum`, `#pinkCoral`, `#pinkCupcake`, `#pinkDaisy`, `#pinkLemonade`, `#pinkPlum`, `#pinkRose`, `#pinkViolet`, `#pistachioGreen`, `#platinum`, `#platinumGray`, `#platinumSilver`, `#plum`, `#plumPie`, `#plumPurple`, `#plumVelvet`, `#powderBlue`, `#puce`, `#pumpkinOrange`, `#purple`, `#purpleAmethyst`, `#purpleDaffodil`, `#purpleDragon`, `#purpleFlower`, `#purpleHaze`, `#purpleIris`, `#purpleJam`, `#purpleLily`, `#purpleMaroon`, `#purpleMimosa`, `#purpleMonster`, `#purpleNavy`, `#purplePink`, `#purplePlum`, `#purpleSageBush`, `#purpleThistle`, `#purpleViolet`.

### R

`#raspberry`, `#raspberryPurple`, `#ratGray`, `#rebeccaPurple`, `#red`, `#redBlood`, `#redDirt`, `#redFox`, `#rice`, `#richLilac`, `#robinEggBlue`, `#roguePink`, `#romanSilver`, `#rose`, `#roseDust`, `#roseGold`, `#roseRed`, `#rosyBrown`, `#rosyFinch`, `#rosyPink`, `#royalBlue`, `#rubberDuckyYellow`, `#rubyRed`, `#rust`.

### S

`#saddleBrown`, `#saffron`, `#saffronRed`, `#sage`, `#sageGreen`, `#saladGreen`, `#salmon`, `#sand`, `#sandstone`, `#sandyBrown`, `#sangria`, `#sapphireBlue`, `#scarlet`, `#schoolBusYellow`, `#seaBlue`, `#seafoamGreen`, `#seaGreen`, `#seaShell`, `#seaTurtleGreen`, `#seaweedGreen`, `#sedona`, `#sepia`, `#sepiaBrown`, `#shamrockGreen`, `#shockingOrange`, `#sienna`, `#silkBlue`, `#silver`, `#silverPink`, `#skyBlue`, `#skyBlueDress`, `#slateBlue`, `#slateBlueGrey`, `#slateGraniteGray`, `#slateGray`, `#slimeGreen`, `#smokeyGray`, `#snow`, `#softIvory`, `#sonicSilver`, `#springGreen`, `#steelBlue`, `#stoplightGoGreen`, `#sunriseOrange`, `#sunYellow`.

### T

`#tan`, `#tanBrown`, `#tangerine`, `#taupe`, `#teaGreen`, `#teal`, `#thistle`, `#tiffanyBlue`, `#tigerOrange`, `#tomato`, `#tomatoSauceRed`, `#tronBlue`, `#tulipPink`, `#turquoise`, `#tyrianPurple`.

### U

`#unbleachedSilk`.

### V

`#valentineRed`, `#vampireGray`, `#vanilla`, `#velvetMaroon`, `#venomGreen`, `#violaPurple`, `#violet`, `#violetRed`.

### W

`#water`, `#watermelonPink`, `#westernCharcoal`, `#wheat`, `#white`, `#whiteChocolate`, `#whiteSmoke`, `#windowsBlue`, `#wineRed`, `#wisteriaPurple`, `#wood`.

### Y

`#yellow`, `#yellowGreen`, `#yellowGreenGrosbeak`, `#yellowLawnGreen`.

### Z

`#zombieGreen`.

## Source and verification

Reviewed 2026-10-30 at commit `4e549e105c54af2e250381d578474b9064d9d4d2`. The catalog is adapted from Arturo's MIT-licensed source: names extracted from `colorNames`, grouped by initial, and written as Arturo literals. Upstream copyright: 2019-2026 Yanis Zafirópulos (aka Dr.Kameleon). Retained [MIT notice](../THIRD-PARTY-NOTICES.md#arturo-color-names).

On Arturo 0.10.0 Arizona Bark, amd64/Linux, all 578 literals parsed as colors and equaled their pinned source `VColor` RGBA constants. The comparison was executed offline in a temporary program. [colors.art](../examples/colors.art) retains representative named-color and dictionary/color assertions in the smoke suite; it does not repeat the entire catalog check. Other runtime versions remain unverified.
