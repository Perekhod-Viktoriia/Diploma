import { View } from '../../models/order/view.model';
import { SubView } from '../../models/order/subview.model';
import { Subdivision } from '../../models/order/subdivision.model';

export interface OrderFiltersInterface {
  views: View[];
  subviews: SubView[];
  subdivisions: Subdivision[];
}
