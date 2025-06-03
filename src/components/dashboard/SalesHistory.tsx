
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

// Empty sales data - prepared for future webhook integration
const sampleSales: any[] = [];

const SalesHistory = () => {
  return (
    <Card className="glass-card card-hover">
      <CardHeader className="border-b border-gold/10">
        <CardTitle className="text-lg font-semibold text-gold">
          Histórico de Vendas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gold/5">
                <TableHead>Cliente</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSales.length > 0 ? (
                sampleSales.map((sale) => (
                  <TableRow key={sale.id} className="hover:bg-gold/5">
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nenhuma venda registrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesHistory;
