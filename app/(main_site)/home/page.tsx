import { Metadata } from 'next';
import ProtectedRoute from '@/app/lib/Protected-Route';
import Announcements from '@/app/ui/home/announcement';
import Feed from '@/app/ui/home/feed';

export const metadata: Metadata = {
  title: 'Homepage',
};
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function Homepage() {

  return (
    <ProtectedRoute>
      <div className="flex">
        {/* Post Feed */}
        <div className="xl:basis-2/3">
          <Feed />
        </div>

        {/* Announcement Feed */}
        <div className="hidden xl:flex">
          <Announcements />
        </div>
      </div>
    </ProtectedRoute>
  );
}



