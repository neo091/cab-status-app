import { describe, it, expect, vi, afterEach } from "vitest"
import { calculateSettlement, getDateRange } from "./util"
import { beforeEach } from "node:test"

describe("Cálculos de Fechas netto", () => {
  beforeEach(() => {
    // Congelamos el tiempo en una fecha específica para que los tests sean deterministas
    // Usamos un lunes para facilitar el cálculo de la semana
    const mockDate = new Date("2026-02-16T12:00:00Z") // Lunes 16 de Feb
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Debería obtener el inicio de 'hoy' (00:00:00)", () => {
    const dateRange = getDateRange("today")
    const expectedDate = new Date()
    expectedDate.setHours(0, 0, 0, 0)

    expect(dateRange).toBe(expectedDate.toISOString())
  })

  //   it("Debería obtener el inicio del 'mes'", () => {
  //     const dateRange = getDateRange("month")
  //     // Debería ser 2026-02-01T00:00:00...
  //     expect(dateRange).toContain("-02-01T00:00:00")
  //   })

  it("Debería retornar null para el filtro 'all'", () => {
    const dateRange = getDateRange("all")
    expect(dateRange).toBeNull()
  })
})

describe("Cálculos de Liquidación Netto", () => {
  it("debería calcular correctamente cuando el pago es en TARJETA (CARD)", () => {
    // Viaje de 100€ en tarjeta. Mi parte son 40€. El jefe me debe 40€.
    const result = calculateSettlement(100, "CARD", 30)
    expect(result).toBe(30)
  })

  it("debería calcular correctamente cuando el pago es en EFECTIVO (CASH)", () => {
    // Viaje de 100€ en efectivo. Mi parte son 40€. Tengo 100€ en mano.
    // Debo entregar 60€ (Resultado: -60).
    const result = calculateSettlement(100, "CASH", 40)
    expect(result).toBe(-60)
  })
})
