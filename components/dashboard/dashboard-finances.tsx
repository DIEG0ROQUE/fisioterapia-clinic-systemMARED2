"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Download,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from "lucide-react"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
}

interface Finances {
  income: Transaction[]
  expenses: Transaction[]
}

const incomeCategories = [
  { value: "terapia", label: "Terapia Manual" },
  { value: "rehabilitacion", label: "Rehabilitación" },
  { value: "consulta", label: "Consulta" },
  { value: "otro_ingreso", label: "Otro Ingreso" },
]

const expenseCategories = [
  { value: "renta", label: "Renta" },
  { value: "luz", label: "Luz" },
  { value: "agua", label: "Agua" },
  { value: "internet", label: "Internet" },
  { value: "insumos", label: "Insumos" },
  { value: "salarios", label: "Salarios" },
  { value: "otro_gasto", label: "Otro Gasto" },
]

export default function DashboardFinances() {
  const [finances, setFinances] = useState<Finances>({ income: [], expenses: [] })
  const [showNewTransaction, setShowNewTransaction] = useState(false)
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    loadFinances()
  }, [])

  const loadFinances = () => {
    const stored = localStorage.getItem("finances")
    if (stored) {
      setFinances(JSON.parse(stored))
    }
  }

  const saveFinances = (fin: Finances) => {
    localStorage.setItem("finances", JSON.stringify(fin))
    setFinances(fin)
  }

  const filterByMonth = (transactions: Transaction[]) => {
    return transactions.filter((t) => {
      const date = new Date(t.date)
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
    })
  }

  const monthlyIncome = filterByMonth(finances.income)
  const monthlyExpenses = filterByMonth(finances.expenses)
  const totalIncome = monthlyIncome.reduce((acc, t) => acc + t.amount, 0)
  const totalExpenses = monthlyExpenses.reduce((acc, t) => acc + t.amount, 0)
  const netProfit = totalIncome - totalExpenses

  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount || !formData.category) {
      alert("Por favor completa todos los campos")
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
    }

    if (transactionType === "income") {
      saveFinances({
        ...finances,
        income: [...finances.income, newTransaction],
      })
    } else {
      saveFinances({
        ...finances,
        expenses: [...finances.expenses, newTransaction],
      })
    }

    setShowNewTransaction(false)
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleDeleteTransaction = (id: string, type: "income" | "expense") => {
    if (confirm("¿Estás seguro de eliminar esta transacción?")) {
      if (type === "income") {
        saveFinances({
          ...finances,
          income: finances.income.filter((t) => t.id !== id),
        })
      } else {
        saveFinances({
          ...finances,
          expenses: finances.expenses.filter((t) => t.id !== id),
        })
      }
    }
  }

  const downloadReport = () => {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    let report = `REPORTE FINANCIERO - ${monthNames[selectedMonth]} ${selectedYear}\n`
    report += `${"=".repeat(50)}\n\n`
    
    report += `RESUMEN\n`
    report += `-`.repeat(30) + `\n`
    report += `Total Ingresos: $${totalIncome.toLocaleString()}\n`
    report += `Total Gastos: $${totalExpenses.toLocaleString()}\n`
    report += `Ganancia Neta: $${netProfit.toLocaleString()}\n\n`

    report += `INGRESOS\n`
    report += `-`.repeat(30) + `\n`
    monthlyIncome.forEach((t) => {
      report += `${new Date(t.date).toLocaleDateString("es-MX")} - ${t.description}: $${t.amount.toLocaleString()}\n`
    })

    report += `\nGASTOS\n`
    report += `-`.repeat(30) + `\n`
    monthlyExpenses.forEach((t) => {
      report += `${new Date(t.date).toLocaleDateString("es-MX")} - ${t.description}: $${t.amount.toLocaleString()}\n`
    })

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-${monthNames[selectedMonth]}-${selectedYear}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Control Financiero</h2>
          <p className="text-muted-foreground">Gestiona los ingresos y gastos de la clínica</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={downloadReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Reporte
          </Button>
          <Button 
            onClick={() => setShowNewTransaction(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Transacción
          </Button>
        </div>
      </div>

      {/* Month Selector */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Label className="text-muted-foreground">Período:</Label>
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(parseInt(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthNames.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2025, 2026].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos</p>
                <p className="text-2xl font-bold text-primary">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gastos</p>
                <p className="text-2xl font-bold text-destructive">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ganancia Neta</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-primary" : "text-destructive"}`}>
                  ${netProfit.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                netProfit >= 0 ? "bg-primary/10" : "bg-destructive/10"
              }`}>
                <Wallet className={`w-6 h-6 ${netProfit >= 0 ? "text-primary" : "text-destructive"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ArrowUpRight className="w-5 h-5 text-primary" />
              Ingresos del Mes
            </CardTitle>
            <CardDescription>{monthlyIncome.length} transacción(es)</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyIncome.length > 0 ? (
              <div className="space-y-2">
                {monthlyIncome.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg group"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("es-MX")} • {
                          incomeCategories.find((c) => c.value === transaction.category)?.label || transaction.category
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">+${transaction.amount.toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(transaction.id, "income")}
                        className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay ingresos registrados</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ArrowDownRight className="w-5 h-5 text-destructive" />
              Gastos del Mes
            </CardTitle>
            <CardDescription>{monthlyExpenses.length} transacción(es)</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyExpenses.length > 0 ? (
              <div className="space-y-2">
                {monthlyExpenses.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg group"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("es-MX")} • {
                          expenseCategories.find((c) => c.value === transaction.category)?.label || transaction.category
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-destructive">-${transaction.amount.toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(transaction.id, "expense")}
                        className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingDown className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay gastos registrados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Transaction Modal */}
      {showNewTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowNewTransaction(false)}
          />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border">
            <button
              type="button"
              onClick={() => setShowNewTransaction(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">Nueva Transacción</h3>

            <div className="space-y-4">
              {/* Transaction Type Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={() => {
                    setTransactionType("income")
                    setFormData({ ...formData, category: "" })
                  }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    transactionType === "income"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTransactionType("expense")
                    setFormData({ ...formData, category: "" })
                  }}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    transactionType === "expense"
                      ? "bg-destructive text-white"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gasto
                </button>
              </div>

              <div className="space-y-2">
                <Label>Descripción *</Label>
                <Input
                  placeholder="Ej: Pago de terapia"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monto *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {(transactionType === "income" ? incomeCategories : expenseCategories).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewTransaction(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className={`flex-1 ${
                    transactionType === "income" 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-destructive text-white hover:bg-destructive/90"
                  }`}
                  onClick={handleAddTransaction}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
