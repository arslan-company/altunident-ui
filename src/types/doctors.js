/**
 * @typedef {{
 * items: Array<{
 *   id: number,
 *   link: string,
 *   doctor_id: number
 * }>;
 * total: number;
 * page: number;
 * size: number;
 * pages: number;
 * }} DoctorYoutubeLinks
*/

/**
 * @typedef {{
 * items: Array<{
 *   id: number;
 *   start_of_day: string;
 *   end_of_day: string;
 *   active: boolean;
 *   day_of_week: number;
 *   doctor_id: number;
 * }>;
 * total: number;
 * page: number;
 * size: number;
 * pages: number;
 * }} DoctorWorkingHours
*/

/**
 * @typedef {Object} DoctorHospital
 * @property {number} id
 * @property {number} hospital_id
 * @property {number} doctor_id
 */

/**
 * @typedef {Object} DoctorHospitals
 * @property {DoctorHospital[]} items
 * @property {number} total
 * @property {number} page
 * @property {number} size
 * @property {number} pages
 */

/**
 * @typedef {{
 * id: number;
 * name: string;
 * description: string;
 * image_url: string;
 * education: string;
 * specialization_training: string;
 * languages: string;
 * order_weight: number;
 * department_id: number;
 * doctor_hospitals: Array<{
 *   doctor_id: number;
 *   hospital_id: number;
 *   id: number;
 * }>;
 * hospital_id: number;
 * }} Doctor
*/

/**
 * @typedef {{
 * items: Doctor[];
 * total: number;
 * page: number;
 * size: number;
 * pages: number;
 * }} Doctors
*/

export { };
