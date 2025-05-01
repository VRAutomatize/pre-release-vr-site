
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
const sampleLeads = [
  { id: 1, name: "João Silva", company: "Tech Solutions", date: "2025-04-28", status: "Qualificado" },
  { id: 2, name: "Maria Oliveira", company: "Consultoria ABC", date: "2025-04-26", status: "Na Base" },
  { id: 3, name: "Pedro Santos", company: "XYZ Ltda", date: "2025-04-24", status: "Novo" },
  { id: 4, name: "Ana Pereira", company: "Global Corp", date: "2025-04-21", status: "Qualificado" },
];

const LeadsHistory = () => {
  return (
    <Card className="border border-gold/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gold">
          Histórico de Leads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{new Date(lead.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.status === "Qualificado" ? "bg-green-100 text-green-800" :
                    lead.status === "Na Base" ? "bg-purple-100 text-purple-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {lead.status}
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

export default LeadsHistory;
