<template>
    <v-card
              class="mt-0 h-100 w-100"
              max-width="250"
              tile
              shaped
            >
              <v-img
                height="70%"
                src="../assets/me.png"
              > </v-img>

              <v-card-title class="text-center text-no-flex"> Kevin Larocque </v-card-title>
              <v-card-subtitle class="text-center"> {{ $t('workTitle') }} </v-card-subtitle>
            
              <v-card-actions>
                <v-tooltip bottom>

                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                    v-bind="attrs"
                    v-on="on">
                      <v-icon>mdi-server</v-icon>
                    </v-btn>
                  </template>
                  <span>Devops</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                    v-bind="attrs"
                    v-on="on">
                      <v-icon>mdi-application-brackets</v-icon>
                    </v-btn>
                  </template>
                  <span>Backend</span>
                </v-tooltip>

                <v-tooltip bottom>

                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                    v-bind="attrs"
                    v-on="on">
                      <v-icon>mdi-cellphone</v-icon>
                    </v-btn>
                  </template>
                  <span>Mobile</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
</template>