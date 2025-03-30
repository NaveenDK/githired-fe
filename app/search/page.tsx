import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { SearchOptions } from './SearchOptions';

export default function Search() {
  return (
    <div className="mt-16 pt-4 flex flex-col pl-32">
      <div className="flex flex-col lg:flex-row self-center">
        {/* keyword */}
        <div className="flex flex-col mr-4">
          <h1 className="pb-4">What</h1>
          <Input type="text" placeholder="Search jobs, skills, or companies" />
          <div className="h-0">
            <SearchOptions />
          </div>
        </div>

        {/* where */}
        <div className="flex flex-col mr-4">
          <h1 className="pb-4">Where</h1>
          <Input type="text" placeholder="Location" />
        </div>

        {/* Search button */}
        <div className="flex flex-col self-end">
          <Button title="Search" />
        </div>
      </div>
    </div>
  );
}
