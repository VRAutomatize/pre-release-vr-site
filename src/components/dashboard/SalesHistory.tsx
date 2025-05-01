
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - In a real application, this would come from an API
const sampleSales = [
  { id: 1, client: "Empresa ABC", value: 1500, date: "2025-04-28", status: "Confirmado" },
  { id: 2, client: "Consultoria XYZ", value: 2300, date: "2025-04-25", status: "Pendente" },
  { id: 3, client: "Tech Solutions", value: 950, date: "2025-04-20", status: "Confirmado" },
  { id: 4, client: "Global Services", value: 3200, date: "2025-04-15", status: "Pago" },
];

const SalesHistory = () => {
  return (
    <Card className="border border-gold/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gold">
          Histórico de Vendas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor (R$)</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.client}</TableCell>
                <TableCell>{sale.value.toLocaleString('pt-BR')}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sale.status === "Confirmado" ? "bg-amber-100 text-amber-800" :
                    sale.status === "Pago" ? "bg-green-100 text-green-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {sale.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesHistory;
