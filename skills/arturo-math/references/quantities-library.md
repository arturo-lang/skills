---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/quantities
    - https://arturo-lang.io/llms.txt
---

# Quantities: function selection

Use for dimensional quantities, units, conversion, custom units, and physical constants. A backtick introduces a unit (see the examples below). Keep the quantity until unit validation is complete; `scalar` removes units. Check dimensions and precision rather than treating unlike quantities as plain numbers.

Currency examples may depend on external data and are not part of offline checks.

Signatures and mutation: [runtime](runtime.md). Examples are fragments; bound inputs.

| Name                                                                                                           | Purpose / example                                                                           |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [acceleration?](https://arturo-lang.io/documentation/library/quantities/acceleration-)                         | ``acceleration? 3`m/s2``                                                                    |
| [action?](https://arturo-lang.io/documentation/library/quantities/action-)                                     | ``action? 4`kg.m2/s``                                                                       |
| [alphaParticleMass](https://arturo-lang.io/documentation/library/quantities/alphaparticlemass)                 | Mass of an alpha particle.                                                                  |
| [angle?](https://arturo-lang.io/documentation/library/quantities/angle-)                                       | ``angle? 5`rad``                                                                            |
| [angstromStar](https://arturo-lang.io/documentation/library/quantities/angstromstar)                           | One ten-billionth of a meter.                                                               |
| [angularVelocity?](https://arturo-lang.io/documentation/library/quantities/angularvelocity-)                   | ``angularVelocity? 6`rad/s``                                                                |
| [area?](https://arturo-lang.io/documentation/library/quantities/area-)                                         | ``area? 3`m2``                                                                              |
| [areaDensity?](https://arturo-lang.io/documentation/library/quantities/areadensity-)                           | ``areaDensity? 4`kg/m2``                                                                    |
| [atomicMass](https://arturo-lang.io/documentation/library/quantities/atomicmass)                               | Mass of an atomic mass unit.                                                                |
| [avogadroConstant](https://arturo-lang.io/documentation/library/quantities/avogadroconstant)                   | Number of atoms in 12 grams of carbon-12.                                                   |
| [bohrRadius](https://arturo-lang.io/documentation/library/quantities/bohrradius)                               | Radius of the first Bohr orbit of the hydrogen atom.                                        |
| [boltzmannConstant](https://arturo-lang.io/documentation/library/quantities/boltzmannconstant)                 | Ratio of the universal gas constant to Avogadro's number.                                   |
| [capacitance?](https://arturo-lang.io/documentation/library/quantities/capacitance-)                           | ``capacitance? 5`F``                                                                        |
| [charge?](https://arturo-lang.io/documentation/library/quantities/charge-)                                     | ``charge? 6`C``                                                                             |
| [classicalElectronRadius](https://arturo-lang.io/documentation/library/quantities/classicalelectronradius)     | Radius of an electron.                                                                      |
| [conductance?](https://arturo-lang.io/documentation/library/quantities/conductance-)                           | ``conductance? 3`S``                                                                        |
| [conductanceQuantum](https://arturo-lang.io/documentation/library/quantities/conductancequantum)               | Conductance of a superconductor.                                                            |
| [conforms?](https://arturo-lang.io/documentation/library/quantities/conforms-)                                 | ``conforms? 3`m `cm``                                                                       |
| [convert](https://arturo-lang.io/documentation/library/quantities/convert)                                     | Convert quantity to unit. ``convert 3`m `cm``                                               |
| [currency?](https://arturo-lang.io/documentation/library/quantities/currency-)                                 | ``currency? 4`USD``                                                                         |
| [current?](https://arturo-lang.io/documentation/library/quantities/current-)                                   | ``current? 5`A``                                                                            |
| [currentDensity?](https://arturo-lang.io/documentation/library/quantities/currentdensity-)                     | ``currentDensity? 6`A/m2``                                                                  |
| [dataTransferRate?](https://arturo-lang.io/documentation/library/quantities/datatransferrate-)                 | ``dataTransferRate? 3`B/s``                                                                 |
| [density?](https://arturo-lang.io/documentation/library/quantities/density-)                                   | ``density? 4`kg/m3``                                                                        |
| [deuteronMass](https://arturo-lang.io/documentation/library/quantities/deuteronmass)                           | Mass of a deuteron.                                                                         |
| [elastance?](https://arturo-lang.io/documentation/library/quantities/elastance-)                               | ``elastance? 5`Daraf``                                                                      |
| [electricField?](https://arturo-lang.io/documentation/library/quantities/electricfield-)                       | ``electricField? 6`V/m``                                                                    |
| [electricityPrice?](https://arturo-lang.io/documentation/library/quantities/electricityprice-)                 | ``electricityPrice? 3`USD/kWh``                                                             |
| [electronCharge](https://arturo-lang.io/documentation/library/quantities/electroncharge)                       | Charge of an electron.                                                                      |
| [electronMass](https://arturo-lang.io/documentation/library/quantities/electronmass)                           | Mass of an electron.                                                                        |
| [electronMassEnergy](https://arturo-lang.io/documentation/library/quantities/electronmassenergy)               | Energy equivalent of the mass of an electron.                                               |
| [energy?](https://arturo-lang.io/documentation/library/quantities/energy-)                                     | ``energy? 4`J``                                                                             |
| [entropy?](https://arturo-lang.io/documentation/library/quantities/entropy-)                                   | ``entropy? 5`J/K``                                                                          |
| [force?](https://arturo-lang.io/documentation/library/quantities/force-)                                       | ``force? 6`N``                                                                              |
| [frequency?](https://arturo-lang.io/documentation/library/quantities/frequency-)                               | ``frequency? 3`Hz``                                                                         |
| [gravitationalConstant](https://arturo-lang.io/documentation/library/quantities/gravitationalconstant)         | Gravitational constant.                                                                     |
| [hartreeEnergy](https://arturo-lang.io/documentation/library/quantities/hartreeenergy)                         | Energy of the ground state of the hydrogen atom.                                            |
| [heatFlux?](https://arturo-lang.io/documentation/library/quantities/heatflux-)                                 | ``heatFlux? 4`W/m2``                                                                        |
| [helionMass](https://arturo-lang.io/documentation/library/quantities/helionmass)                               | Mass of a helion.                                                                           |
| [illuminance?](https://arturo-lang.io/documentation/library/quantities/illuminance-)                           | ``illuminance? 5`lx``                                                                       |
| [impedanceOfVacuum](https://arturo-lang.io/documentation/library/quantities/impedanceofvacuum)                 | Impedance of free space.                                                                    |
| [in](https://arturo-lang.io/documentation/library/quantities/in)                                               | Convert quantity to unit. ``in `cm 3`m``                                                    |
| [inductance?](https://arturo-lang.io/documentation/library/quantities/inductance-)                             | ``inductance? 6`H``                                                                         |
| [information?](https://arturo-lang.io/documentation/library/quantities/information-)                           | ``information? 3`kB``                                                                       |
| [inverseConductanceQuantum](https://arturo-lang.io/documentation/library/quantities/inverseconductancequantum) | Inverse of the conductance of a superconductor.                                             |
| [jerk?](https://arturo-lang.io/documentation/library/quantities/jerk-)                                         | ``jerk? 4`m/s3``                                                                            |
| [josephsonConstant](https://arturo-lang.io/documentation/library/quantities/josephsonconstant)                 | Inverse of the flux quantum.                                                                |
| [kinematicViscosity?](https://arturo-lang.io/documentation/library/quantities/kinematicviscosity-)             | ``kinematicViscosity? 5`m2/s``                                                              |
| [length?](https://arturo-lang.io/documentation/library/quantities/length-)                                     | ``length? 6`m``                                                                             |
| [luminosity?](https://arturo-lang.io/documentation/library/quantities/luminosity-)                             | ``luminosity? 3`cd``                                                                        |
| [luminousFlux?](https://arturo-lang.io/documentation/library/quantities/luminousflux-)                         | ``luminousFlux? 4`lm``                                                                      |
| [magneticFieldStrength?](https://arturo-lang.io/documentation/library/quantities/magneticfieldstrength-)       | ``magneticFieldStrength? 3`A/m``                                                            |
| [magneticFlux?](https://arturo-lang.io/documentation/library/quantities/magneticflux-)                         | ``magneticFlux? 5`Wb``                                                                      |
| [magneticFluxDensity?](https://arturo-lang.io/documentation/library/quantities/magneticfluxdensity-)           | ``magneticFluxDensity? 6`T``                                                                |
| [magneticFluxQuantum](https://arturo-lang.io/documentation/library/quantities/magneticfluxquantum)             | Magnetic flux of a superconductor.                                                          |
| [mass?](https://arturo-lang.io/documentation/library/quantities/mass-)                                         | ``mass? 4`kg``                                                                              |
| [massFlowRate?](https://arturo-lang.io/documentation/library/quantities/massflowrate-)                         | ``massFlowRate? 5`kg/s``                                                                    |
| [molarConcentration?](https://arturo-lang.io/documentation/library/quantities/molarconcentration-)             | ``molarConcentration? 6`mol/m3``                                                            |
| [molarGasConstant](https://arturo-lang.io/documentation/library/quantities/molargasconstant)                   | Universal gas constant.                                                                     |
| [moleFlowRate?](https://arturo-lang.io/documentation/library/quantities/moleflowrate-)                         | ``moleFlowRate? 3`mol/s``                                                                   |
| [momentofInertia?](https://arturo-lang.io/documentation/library/quantities/momentofinertia-)                   | ``momentofInertia? 4`kg.m2``                                                                |
| [momentum?](https://arturo-lang.io/documentation/library/quantities/momentum-)                                 | ``momentum? 5`kg.m/s``                                                                      |
| [muonMass](https://arturo-lang.io/documentation/library/quantities/muonmass)                                   | Mass of a muon.                                                                             |
| [neutronMass](https://arturo-lang.io/documentation/library/quantities/neutronmass)                             | Mass of a neutron.                                                                          |
| [permeability?](https://arturo-lang.io/documentation/library/quantities/permeability-)                         | ``permeability? 6`H/m``                                                                     |
| [permittivity?](https://arturo-lang.io/documentation/library/quantities/permittivity-)                         | ``permittivity? 3`F/m``                                                                     |
| [planckConstant](https://arturo-lang.io/documentation/library/quantities/planckconstant)                       | Ratio of the energy of a photon to its frequency.                                           |
| [planckLength](https://arturo-lang.io/documentation/library/quantities/plancklength)                           | Length of the Planck scale.                                                                 |
| [planckMass](https://arturo-lang.io/documentation/library/quantities/planckmass)                               | Mass of the Planck scale.                                                                   |
| [planckTemperature](https://arturo-lang.io/documentation/library/quantities/plancktemperature)                 | Temperature of the Planck scale.                                                            |
| [planckTime](https://arturo-lang.io/documentation/library/quantities/plancktime)                               | Time of the Planck scale.                                                                   |
| [potential?](https://arturo-lang.io/documentation/library/quantities/potential-)                               | ``potential? 4`V``                                                                          |
| [power?](https://arturo-lang.io/documentation/library/quantities/power-)                                       | ``power? 5`W``                                                                              |
| [pressure?](https://arturo-lang.io/documentation/library/quantities/pressure-)                                 | ``pressure? 6`Pa``                                                                          |
| [property](https://arturo-lang.io/documentation/library/quantities/property)                                   | Described property of quantity or unit. ``property 3`m``                                    |
| [protonMass](https://arturo-lang.io/documentation/library/quantities/protonmass)                               | Mass of a proton.                                                                           |
| [protonMassEnergy](https://arturo-lang.io/documentation/library/quantities/protonmassenergy)                   | Energy equivalent of the mass of a proton.                                                  |
| [radiation?](https://arturo-lang.io/documentation/library/quantities/radiation-)                               | ``radiation? 3`Gy``                                                                         |
| [radiationExposure?](https://arturo-lang.io/documentation/library/quantities/radiationexposure-)               | ``radiationExposure? 4`C/kg``                                                               |
| [reducedPlanckConstant](https://arturo-lang.io/documentation/library/quantities/reducedplanckconstant)         | Reduced Planck constant; inspect its value and units before using it in a formula.          |
| [resistance?](https://arturo-lang.io/documentation/library/quantities/resistance-)                             | ``resistance? 5`Ohm``                                                                       |
| [resistivity?](https://arturo-lang.io/documentation/library/quantities/resistivity-)                           | ``resistivity? 6`Ohm.m``                                                                    |
| [rydbergConstant](https://arturo-lang.io/documentation/library/quantities/rydbergconstant)                     | Rydberg constant.                                                                           |
| [salary?](https://arturo-lang.io/documentation/library/quantities/salary-)                                     | ``salary? 3`USD/h``                                                                         |
| [scalar](https://arturo-lang.io/documentation/library/quantities/scalar)                                       | Quantity value in the appropriate numeric type. ``scalar 3`m``                              |
| [snap?](https://arturo-lang.io/documentation/library/quantities/snap-)                                         | ``snap? 3`m/s4``                                                                            |
| [solidAngle?](https://arturo-lang.io/documentation/library/quantities/solidangle-)                             | ``solidAngle? 4`sr``                                                                        |
| [specificVolume?](https://arturo-lang.io/documentation/library/quantities/specificvolume-)                     | ``specificVolume? 5`m3/kg``                                                                 |
| [specify](https://arturo-lang.io/documentation/library/quantities/specify)                                     | Define new user unit. ``specify 'doubleMeter 2`m``                                          |
| [speed?](https://arturo-lang.io/documentation/library/quantities/speed-)                                       | ``speed? 6`m/s``                                                                            |
| [speedOfLight](https://arturo-lang.io/documentation/library/quantities/speedoflight)                           | Speed of light in a vacuum.                                                                 |
| [standardGasVolume](https://arturo-lang.io/documentation/library/quantities/standardgasvolume)                 | Volume of one mole of an ideal gas at standard temperature and pressure.                    |
| [standardPressure](https://arturo-lang.io/documentation/library/quantities/standardpressure)                   | Standard pressure.                                                                          |
| [standardTemperature](https://arturo-lang.io/documentation/library/quantities/standardtemperature)             | Standard temperature.                                                                       |
| [substance?](https://arturo-lang.io/documentation/library/quantities/substance-)                               | ``substance? 4`mol``                                                                        |
| [surfaceTension?](https://arturo-lang.io/documentation/library/quantities/surfacetension-)                     | ``surfaceTension? 5`N/m``                                                                   |
| [tauMass](https://arturo-lang.io/documentation/library/quantities/taumass)                                     | Mass of a tau.                                                                              |
| [temperature?](https://arturo-lang.io/documentation/library/quantities/temperature-)                           | ``temperature? 6`oC``                                                                       |
| [thermalConductivity?](https://arturo-lang.io/documentation/library/quantities/thermalconductivity-)           | ``thermalConductivity? 3`W/m.K``                                                            |
| [thermalInsulance?](https://arturo-lang.io/documentation/library/quantities/thermalinsulance-)                 | ``thermalInsulance? 4`m2.K/W``                                                              |
| [thomsonCrossSection](https://arturo-lang.io/documentation/library/quantities/thomsoncrosssection)             | Cross section of an electron.                                                               |
| [time?](https://arturo-lang.io/documentation/library/quantities/time-)                                         | ``time? 5`s``                                                                               |
| [tritonMass](https://arturo-lang.io/documentation/library/quantities/tritonmass)                               | Mass of a triton.                                                                           |
| [unitless?](https://arturo-lang.io/documentation/library/quantities/unitless-)                                 | ``unitless? 6`items``                                                                       |
| [units](https://arturo-lang.io/documentation/library/quantities/units)                                         | Units of quantity. ``units 3`m``                                                            |
| [vacuumPermeability](https://arturo-lang.io/documentation/library/quantities/vacuumpermeability)               | Permeability of free space.                                                                 |
| [vacuumPermittivity](https://arturo-lang.io/documentation/library/quantities/vacuumpermittivity)               | Permittivity of free space.                                                                 |
| [viscosity?](https://arturo-lang.io/documentation/library/quantities/viscosity-)                               | ``viscosity? 3`Pa.s``                                                                       |
| [volume?](https://arturo-lang.io/documentation/library/quantities/volume-)                                     | ``volume? 4`m3``                                                                            |
| [volumetricFlow?](https://arturo-lang.io/documentation/library/quantities/volumetricflow-)                     | ``volumetricFlow? 5`m3/s``                                                                  |
| [vonKlitzingConstant](https://arturo-lang.io/documentation/library/quantities/vonklitzingconstant)             | Von Klitzing constant; inspect its resistance value and units before using it in a formula. |
| [waveNumber?](https://arturo-lang.io/documentation/library/quantities/wavenumber-)                             | ``waveNumber? 6`/m``                                                                        |

Use `convert value unit` or `in unit value`. Check `conforms?` before converting dimensions; extract a `scalar` only after validation. Conversions leave the source quantity unchanged.
