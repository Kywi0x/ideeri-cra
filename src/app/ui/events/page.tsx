import UiLayout from "../layout";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function EventsPage() {
  return (
    <UiLayout>
      <Card>
        <CardHeader title="Événements [IDEERI]" subtitle="Non liés" />
        <CardBody>
          <div className="flex items-center gap-2 mb-3">
            <input className="border rounded px-3 py-2 text-sm w-full" placeholder="Recherche…" />
            <Button variant="secondary">Sync</Button>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Aucun événement pour l’instant.</div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Détails" />
        <CardBody>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Sélectionnez un événement pour voir les détails. <Badge color="amber">À lier</Badge></div>
        </CardBody>
      </Card>
    </UiLayout>
  );
}

