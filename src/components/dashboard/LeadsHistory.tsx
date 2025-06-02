
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
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const LeadsHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="glass-card card-hover">
        <CardHeader className="border-b border-gold/10">
          <CardTitle className="text-lg font-semibold text-gold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Histórico de Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gold/5">
                  <TableHead>Nome</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="h-16 w-16 bg-gold/10 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-gold/50" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-muted-foreground mb-1">
                          Nenhum lead registrado
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          Leads captados através do sistema aparecerão aqui
                        </p>
                      </div>
                    </motion.div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LeadsHistory;
