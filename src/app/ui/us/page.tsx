import UiLayout from "../layout";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function USPage() {
  return (
    <UiLayout>
      <Card>
        <CardHeader title="User Stories Notion" />
        <CardBody>
          <div className="flex items-center gap-2 mb-3">
            <input className="border rounded px-3 py-2 text-sm w-full" placeholder="Filtre texte…" />
            <Button variant="secondary">Sync</Button>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Aucune US synchronisée pour l’instant.</div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Détails" />
        <CardBody>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Sélectionnez une US pour voir les détails.</div>
        </CardBody>
      </Card>
    </UiLayout>
  );
}

