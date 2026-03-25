import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateLinkDialog } from "./components/create-link-dialog";
import { EditLinkDialog } from "./components/edit-link-dialog";
import { DeleteLinkDialog } from "./components/delete-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getLinksByUserId(userId);

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">You have no shortened links yet.</p>
      ) : (
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant="secondary">{link.shortCode}</Badge>
                    <span className="truncate text-sm font-normal text-muted-foreground">
                      {link.url}
                    </span>
                    <div className="ml-auto flex items-center gap-1 shrink-0">
                      <EditLinkDialog id={link.id} url={link.url} shortCode={link.shortCode} />
                      <DeleteLinkDialog id={link.id} shortCode={link.shortCode} />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
