
/**
 * Calculates the total carbon emissions based on usage and emission factors.
 * @param {Object} activities - Object with activity keys and quantity values.
 * @param {Object} emissionFactors - Emission factor map.
 * @returns {Number} Total CO2 in kg.
 */
export const calculateEmissions = (activities, emissionFactors) => {
  let totalEmissions = 0;
  for (const [activity, quantity] of Object.entries(activities)) {
    const factor = emissionFactors[activity];
    if (factor) {
      totalEmissions += quantity * factor;
    }
  }
  return totalEmissions;
};

/**
 * Converts CO2 offset (kg) to carbon credits.
 * @param {Number} co2Offset - CO2 in kg.
 * @returns {Number} Carbon credits (1 credit = 1000 kg CO2)
 */
export const convertToCarbonCredits = (co2Offset) => {
  return co2Offset / 1000;
};