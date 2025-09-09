import UiLayout from "../layout";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Table, THead, TRow, TH, TD } from "@/components/ui/Table";

export default function LinkerPage() {
  return (
    <UiLayout>
      <Card>
        <CardHeader title="Rapprochement Event ↔ US" />
        <CardBody>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Sélectionnez un événement, puis choisissez une US.</div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Suggestions" />
        <CardBody>
          <Table>
            <THead>
              <TRow>
                <TH>Event</TH>
                <TH>US</TH>
                <TH>Score</TH>
              </TRow>
            </THead>
            <tbody>
              <TRow>
                <TD>—</TD>
                <TD>—</TD>
                <TD>—</TD>
              </TRow>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </UiLayout>
  );
}

