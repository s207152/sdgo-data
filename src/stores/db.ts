import { acceptHMRUpdate, defineStore } from 'pinia'
import type { WorkerHttpvfs } from 'sql.js-httpvfs'
import { createDbWorker } from 'sql.js-httpvfs'

export interface WorkerState {
  loading: boolean
  w: WorkerHttpvfs | null
}

export const useDbWorkerStore = defineStore('dbWorker', {
  state: () => ({
    loading: true,
    w: null,
  } as WorkerState),
  getters: {
    worker: state => state.w,
  },
  actions: {
    async createWorker() {
      this.loading = true

      const workerUrl = '/sdgo-data/sqlite.worker.js'
      const wasmUrl = '/sdgo-data/sql-wasm.wasm'
      this.w = await createDbWorker(
        [{
          from: 'inline',
          config: {
            serverMode: 'full',
            requestChunkSize: 4096,
            url: '/sdgo-data/data.sqlite',
          },
        }],
        workerUrl,
        wasmUrl,
      )

      this.loading = false
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDbWorkerStore, import.meta.hot))
