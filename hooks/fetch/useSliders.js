import { useQuery } from '@tanstack/react-query';

import { getSlider, getSliders } from '@/api/slider';

/**
 * @param {{
 * params: {
 *  id: string | number;
 * }
 * options: import('@/types/react-query').QueryOptions<import('@/types/sliders').Slider>
 * }} params
*/
export function useSlider({ params, options = {} }) {
  const sliderQuery = useQuery({
    queryKey: ['slider', params],
    queryFn: () => getSlider(params?.id),
    ...options,
  });

  return sliderQuery;
}

/**
 * @param {{
 * params: {
 *  hospitalId: string | number;
 *  language: string;
 * }
 * options: import('@/types/react-query').QueryOptions<import('@/types/sliders').Sliders>
 * }} params
*/
export function useSliders({ params = {}, options = {} }) {
  const slidersQuery = useQuery({
    queryKey: ['sliders', params],
    queryFn: () => getSliders(
      params?.hospitalId,
      params?.language,
    ),
    ...options,
  });

  return slidersQuery;
}
