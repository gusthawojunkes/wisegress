<template>
  <v-container class="align-center w-50">
    <v-row>
      <v-col cols="8" style="padding-left: 0">
        <v-text-field
            label="Nome completo"
            variant="outlined"
            required
            v-model="user.name"
            :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="4" style="padding-right: 0">
        <v-text-field
            label="Data de nascimento"
            variant="outlined"
            required
            v-model="user.birthday"
            :rules="[rules.required]"
            type="datetime-local"
        ></v-text-field>
      </v-col>

    </v-row>
    <v-row>
      <v-text-field
          label="Email"
          variant="outlined"
          disabled
          v-model="user.email"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
          label="Senha"
          variant="outlined"
          disabled
          type="password"
          v-model="user.password"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col cols="4" style="padding-left: 0">
        <v-text-field
            label="Situação"
            variant="outlined"
            disabled
            v-model="LABELS[user.status]"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="user.preferences.useTodo" label="Todo"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="user.preferences.useKanban" label="Kanban"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="user.preferences.usePomodoro" label="Pomodoro"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="user.preferences.useAgenda" label="Agenda"></v-checkbox>
      </v-col>
    </v-row>
    <v-row><h3>Pomodoro</h3></v-row>
    <v-row>
      <v-col cols="3" style="padding-left: 0">
        <v-text-field
            label="Duração"
            variant="outlined"
            type="number"
            v-model="user.preferences.pomodoroConfiguration.duration"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            label="Tempo da pausa longa"
            variant="outlined"
            type="number"
            v-model="user.preferences.pomodoroConfiguration.longbreakDuration"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            label="Tempo da pausa curta"
            variant="outlined"
            type="number"
            v-model="user.preferences.pomodoroConfiguration.shortbreakDuration"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            label="Ciclos"
            variant="outlined"
            type="number"
            v-model="user.preferences.pomodoroConfiguration.cicles"
        ></v-text-field>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="6" style="padding-left: 0">
        <v-combobox
            v-model="selectedWeekdays"
            :items="possibleWeekdays"
            label="Dias de limpeza"
            multiple
        >
          <template v-slot:selection="data">
            <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :model-value="data.selected"
                :disabled="data.disabled"
                size="small"
                @click:close="data.parent.selectItem(data.item)"
            >
              <template v-slot:prepend>
                <v-avatar
                    color="#47667b"
                    class="bg-accent text-uppercase"
                    start
                >{{ data.item.title.slice(0, 1) }}
                </v-avatar>
              </template>
              {{ data.item.title }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="3">

      </v-col>
      <v-col cols="3">

      </v-col>
      <v-col cols="3">

      </v-col>

    </v-row>

    <v-row class="d-flex justify-end">
      <v-btn prepend-icon="mdi-content-save-all">
        Salvar
      </v-btn>
    </v-row>

  </v-container>
</template>

<script>
import UserService from "@/services/user.service";
import {LABELS} from "@/helpers/Status";
import Time from "@/helpers/Time";
import User from "@/helpers/User";

export default {
  name: "Configuration",
  computed: {
    LABELS() {
      return LABELS
    }
  },
  data() {
    return {
      user: UserService.getUser(),
      rules: {
        required: value => !!value || 'Campo obrigatório!',
      },
      selectedWeekdays: User.defaultSelectedWeekdays(),
      possibleWeekdays: Object.values(Time.weekdays()),
    }
  }
}
</script>
