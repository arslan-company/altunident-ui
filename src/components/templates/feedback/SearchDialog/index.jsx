import Dialog from '../Dialog';
import GeneralSearch from '../../inputs/GeneralSearch';

/**
 * @param {React.ComponentProps<typeof Dialog>} props
*/
export default function SearchDialog({ ...props }) {
  return (
    <Dialog title="Genel Arama" {...props}>
      <GeneralSearch />
    </Dialog>
  );
}
