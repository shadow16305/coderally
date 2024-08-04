import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PostCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Card Title</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};
