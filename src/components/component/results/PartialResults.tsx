import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const PartialResults = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-bold py-3">
        Results are still being processed. Please check again later.
      </CardTitle>
    </CardHeader>
  </Card>
);

export default PartialResults;
