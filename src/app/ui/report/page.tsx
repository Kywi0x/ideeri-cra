import UiLayout from "../layout";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Table, THead, TRow, TH, TD } from "@/components/ui/Table";

export default function ReportPage() {
  return (
    <UiLayout>
      <Card className="md:col-span-2">
        <CardHeader title="CRA Report" />
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <input type="date" className="border rounded px-3 py-2 text-sm" />
              <input type="date" className="border rounded px-3 py-2 text-sm" />
            </div>
            <Button variant="secondary">Exporter CSV</Button>
          </div>
          <Table>
            <THead>
              <TRow>
                <TH>User</TH>
                <TH>US</TH>
                <TH>Durée (min)</TH>
              </TRow>
            </THead>
            <tbody>
              <TRow>
                <TD className="text-neutral-500">—</TD>
                <TD className="text-neutral-500">—</TD>
                <TD className="text-neutral-500">0</TD>
              </TRow>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </UiLayout>
  );
}

